#!/usr/bin/env bash
# Optional extras for DevMagic dev containers.
#
# Served at https://devmagic.run/setup and meant to run as the opt-in
# postCreateCommand in devcontainer.json (it ships commented out there):
#
#   curl -fsSL https://devmagic.run/setup | bash
#
# Self-contained on purpose: it must work in a fresh container with no
# personal dotfiles. If a dotfiles folder is present (DevMagic mounts
# ~/.config/dotfiles from the host by default), its shell/init.sh is linked
# into the shell rc files at the end.

set -euo pipefail

DOTFILES_DIR="${DOTFILES_DIR:-$HOME/.config/dotfiles}"
USER_BIN_DIR="${USER_BIN_DIR:-$HOME/bin}"
FZF_REPO="${FORK_FZF_REPO:-https://github.com/marcelocra/fzf.git}"

# -----------------------------------------------------------------------------
# helpers
# -----------------------------------------------------------------------------

log_info() { printf '%s\n' "$*"; }
log_success() { printf '%s\n' "$*"; }
log_warning() { printf '%s\n' "$*" >&2; }

command_exists() { command -v "$1" >/dev/null 2>&1; }

# Run a command as root: directly when already root, via sudo otherwise.
as_root() {
    if [ "$(id -u)" -eq 0 ]; then
        "$@"
    elif command_exists sudo; then
        sudo "$@"
    else
        log_warning "⚠️ Not root and no sudo available; skipping: $*"
        return 1
    fi
}

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

    as_root apt-get update -y || return 0
    as_root apt-get install -y \
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
        https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh |
        sh -s -- --unattended
    log_success "✅ oh-my-zsh installed"
}

install_fzf() {
    local fzf_dir="$HOME/.fzf"
    local fzf_bin="$USER_BIN_DIR/fzf"

    if command_exists fzf && [[ -L "$fzf_bin" ]]; then
        log_info "✅ fzf already installed"
        return 0
    fi

    log_info "📦 Installing fzf..."
    if [[ -d "$fzf_dir" ]]; then
        (cd "$fzf_dir" && git pull) || true
    else
        git clone --depth 1 "$FZF_REPO" "$fzf_dir"
    fi

    "$fzf_dir/install" --bin
    mkdir -p "$USER_BIN_DIR"
    ln -sf "$fzf_dir/bin/fzf" "$fzf_bin"
    log_success "✅ fzf installed"
}

link_shell_init() {
    if [[ ! -f "$DOTFILES_DIR/shell/init.sh" ]]; then
        log_info "ℹ️ No dotfiles shell init found ($DOTFILES_DIR/shell/init.sh), skipping shell links"
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

    log_info "🚀 Starting container extras setup..."

    timed "System packages" install_system_packages
    timed "oh-my-zsh" install_oh_my_zsh
    timed "fzf" install_fzf
    timed "Shell init links" link_shell_init

    local total_elapsed=$((SECONDS - total_start))
    log_success "🎉 Container extras setup complete in $(format_duration "$total_elapsed")"
}

main "$@"
