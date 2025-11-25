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

    # Run dotfiles installation script if available.
    local dotfiles_install="$HOME/prj/dotfiles/shell/install.sh"
    if [ -x "$dotfiles_install" ]; then
        log "🧩 Running dotfiles install script..."
        "$dotfiles_install" || log_warning "⚠️  Dotfiles install script failed"
        echo
    else
        log_warning "⚠️  No dotfiles install script found at ~/prj/dotfiles/shell/install.sh"
        log "   Skipping dotfiles installation"
        echo
    fi

    log_success "✅ DevMagic container setup complete!"
    log "ℹ️  Shell history is configured via dotfiles (~/prj/dotfiles/shell/init.sh)"
    log "ℹ️  Editor configuration is handled via dotfiles"
}

# Run main function
main
