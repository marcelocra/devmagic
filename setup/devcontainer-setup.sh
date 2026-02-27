#!/usr/bin/env bash
# Container-only bootstrap for devcontainers
# Extracted from dotfiles setup intent, intentionally minimal and safe.

LOG_TAG="dotfiles-container"
source ~/bin/lib.bash && assert_executed || return 1
set -euo pipefail

DOTFILES_DIR="${DOTFILES_DIR:-$HOME/.config/dotfiles}"
USER_BIN_DIR="${USER_BIN_DIR:-$HOME/bin}"

# -----------------------------------------------------------------------------
# helpers
# -----------------------------------------------------------------------------

format_duration() {
    local seconds="$1"
    if ((seconds < 60)); then
        echo "${seconds}s"
    else
        echo "$((seconds / 60))m $((seconds % 60))s"
    fi
}

timed() {
    local name="$1"
    local func="$2"
    local start_time=$SECONDS

    "$func"
    local exit_code=$?

    local elapsed=$((SECONDS - start_time))
    if ((elapsed > 0)); then
        log_info "⏱️  $name took $(format_duration "$elapsed")"
    fi

    return "$exit_code"
}

load_path() {
    if [[ -d "$USER_BIN_DIR" ]]; then
        export PATH="$USER_BIN_DIR:$PATH"
    fi
    if [[ -d "$HOME/.local/bin" ]]; then
        export PATH="$HOME/.local/bin:$PATH"
    fi
    local pnpm_home="${PNPM_HOME:-$HOME/.local/share/pnpm}"
    if [[ -d "$pnpm_home" ]]; then
        export PNPM_HOME="$pnpm_home"
        export PATH="$PNPM_HOME:$PATH"
    fi
}

# -----------------------------------------------------------------------------
# container-focused install steps
# -----------------------------------------------------------------------------

install_system_packages() {
    if ! command_exists apt-get; then
        log_info "ℹ️ apt-get not found; skipping system packages"
        return 0
    fi

    log_info "📦 Installing container system packages..."
    export DEBIAN_FRONTEND=noninteractive

    sudo apt-get update -y
    sudo apt-get install -y \
        ca-certificates \
        curl \
        git \
        jq \
        wget \
        zsh \
        unzip \
        zip \
        ripgrep \
        fd-find \
        xclip \
        pipx || log_warning "Some packages failed to install"

    log_success "✅ System packages done"
}

install_oh_my_zsh() {
    if [[ -d "$HOME/.oh-my-zsh" ]]; then
        log_info "✅ oh-my-zsh already installed"
        return 0
    fi
    log_info "📦 Installing oh-my-zsh..."
    curl --proto '=https' --tlsv1.2 -fsSL -o- \
      https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh \
      | sh -s -- --unattended
    log_success "✅ oh-my-zsh installed"
}

install_fzf() {
    local fzf_dir="$HOME/.fzf"
    local fzf_bin="$USER_BIN_DIR/fzf"
    local fzf_repo="${FORK_FZF_REPO:-https://github.com/marcelocra/fzf.git}"

    if command_exists fzf && [[ -L "$fzf_bin" ]]; then
        log_info "✅ fzf already installed"
        return 0
    fi

    log_info "📦 Installing fzf..."
    if [[ -d "$fzf_dir" ]]; then
        (cd "$fzf_dir" && git pull) || true
    else
        git clone --depth 1 "$fzf_repo" "$fzf_dir"
    fi

    "$fzf_dir/install" --bin
    mkdir -p "$USER_BIN_DIR"
    ln -sf "$fzf_dir/bin/fzf" "$fzf_bin"
    log_success "✅ fzf installed"
}

link_shell_init() {
    if [[ ! -d "$DOTFILES_DIR" ]]; then
        log_warning "DOTFILES_DIR not found ($DOTFILES_DIR), skipping shell links"
        return 0
    fi

    log_info "🔗 Linking shell init..."
    local init_source="source $DOTFILES_DIR/shell/init.sh"

    for rc in "$HOME/.zshrc" "$HOME/.bashrc"; do
        if [[ -f "$rc" ]]; then
            if ! grep -q "source.*shell/init.sh" "$rc"; then
                {
                    echo ""
                    echo "# Dotfiles initialization"
                    echo "$init_source"
                } >>"$rc"
            fi
        else
            {
                echo "# Dotfiles initialization"
                echo "$init_source"
            } >"$rc"
        fi
    done

    log_success "✅ Shell init linked"
}

# -----------------------------------------------------------------------------
# main
# -----------------------------------------------------------------------------

main() {
    load_path
    local total_start=$SECONDS

    log_info "🚀 Starting container bootstrap..."

    timed "System packages" install_system_packages
    timed "oh-my-zsh" install_oh_my_zsh
    timed "fzf" install_fzf
    timed "Shell init links" link_shell_init

    local total_elapsed=$((SECONDS - total_start))
    log_success "🎉 Container bootstrap complete in $(format_duration "$total_elapsed")"
}

main "$@"
