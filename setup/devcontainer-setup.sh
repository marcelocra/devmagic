#!/usr/bin/env bash
# DevMagic Container Setup Script
# Handles SSH keys, AI CLI tools installation, and other container-specific setup
# This runs once when the container is created (postCreateCommand)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging helpers
log() {
    echo -e "${BLUE}$1${NC}"
}

log_success() {
    echo -e "${GREEN}$1${NC}"
}

log_warning() {
    echo -e "${YELLOW}$1${NC}"
}

log_error() {
    echo -e "${RED}$1${NC}"
}

# ---------------------------------------------------------------------------
# SSH Key Setup
# ---------------------------------------------------------------------------
setup_ssh_keys() {
    [ ! -d "$HOME/.ssh-from-host" ] && {
        log_warning "ℹ️  No SSH keys to copy (no .ssh-from-host directory found)"
        return 0
    }

    log "🔑 Setting up SSH keys..."
    cp -r ~/.ssh-from-host/. ~/.ssh
    chmod 700 ~/.ssh
    find ~/.ssh -type f -exec chmod 600 {} \;
    log_success "✅ SSH keys configured"
}

# ---------------------------------------------------------------------------
# AI CLI Tools Installation
# ---------------------------------------------------------------------------

# NPM packages to install globally (using pnpm)
# Move packages between arrays as needed
NPM_PACKAGES_UNUSED=(
    "@openai/codex"
)
NPM_PACKAGES=(
    "@google/gemini-cli"
    "@anthropic-ai/claude-code"
    "@github/copilot"
)

setup_ai_tools() {
    log "🤖 Installing AI CLI tools..."

    # Configure pnpm global store
    log "   Configuring pnpm global store..."
    export PNPM_HOME="$HOME/.local/share/pnpm"
    mkdir -p "$PNPM_HOME"
    case ":$PATH:" in
        *":$PNPM_HOME:"*) ;;
        *) export PATH="$PNPM_HOME:$PATH" ;;
    esac

    # Install NPM packages globally using pnpm
    if command -v pnpm &> /dev/null; then
        for package in "${NPM_PACKAGES[@]}"; do
            log "   Installing $package..."
            pnpm add -g "$package" || log_warning "   Failed to install $package"
        done
    else
        log_warning "   pnpm not found, skipping NPM packages"
    fi

    # Install aider via official installer (includes uv + Python 3.12 if needed)
    log "   💡 To install aider: curl -LsSf https://aider.chat/install.sh | sh"

    log_success "✅ AI CLI tools setup complete"
}

# ---------------------------------------------------------------------------
# Main execution
# ---------------------------------------------------------------------------
main() {
    log "🔧 Running DevMagic container setup..."
    echo

    setup_ssh_keys
    echo

    setup_ai_tools
    echo

    # TODO: Move this whole block to a separate script, following the patterns
    # established above.
    # <move-to-funcion>

    # Dotfiles setup with automatic cloning
    local dotfiles_dir="$HOME/prj/dotfiles"
    # TODO: Considering how this script is called, through a curl | bash, I don't think the user will be able to set these variables easily. See the comment regarding config variables in the readme. Likely it would require a config/env file, which I was trying to avoid. If you have any other suggestion, please let me know. In the past, I considered changing the endpoint (/setup) to allow customization through query parameters, but that might be clunky? Actually, take a look at the endpoints, as I believe we already allow for a version/branch parameter... might just need to change how it is parsed to actually support the repo user too.
    local dotfiles_repo="${DEVMAGIC_DOTFILES_REPO:-https://github.com/marcelocra/dotfiles.git}"
    local dotfiles_branch="${DEVMAGIC_DOTFILES_BRANCH:-main}"

    log "📦 Checking for dotfiles..."

    # Clone dotfiles if directory doesn't exist
    if [ ! -d "$dotfiles_dir" ]; then
        log "   Cloning dotfiles from $dotfiles_repo..."
        mkdir -p "$(dirname "$dotfiles_dir")"
        if git clone --depth=1 --branch "$dotfiles_branch" "$dotfiles_repo" "$dotfiles_dir"; then
            log_success "   Dotfiles cloned successfully"
        else
            log_warning "   Failed to clone dotfiles (network issue?). Skipping."
            echo
            # TODO: This can't be here, otherwise it exits the main function prematurely, one more reason to use the separate function.
            return 0
        fi
    else
        log "   Dotfiles directory already exists at $dotfiles_dir"
    fi

    # Run dotfiles installation script if available
    local dotfiles_install="$dotfiles_dir/shell/install.sh"
    if [ -f "$dotfiles_install" ]; then
        log "🧩 Running dotfiles install script..."
        # TODO: The dotfiles_install script has a shebang and is executable. Is it still better to use bash to run it? (This is really a question, so I can learn. Consider most recent (nov/2025) best practices to answer.)
        bash "$dotfiles_install" || log_warning "⚠️  Dotfiles install script failed"
        echo
    else
        log_warning "⚠️  No dotfiles install script found at $dotfiles_install"
        log "   Skipping dotfiles installation"
        echo
    fi

    # </move-to-function>

    log_success "✅ DevMagic container setup complete!"
    log "ℹ️  Shell history is configured via dotfiles (~/prj/dotfiles/shell/init.sh)"
    log "ℹ️  Editor configuration is handled via dotfiles"
}

# Run main function
main
