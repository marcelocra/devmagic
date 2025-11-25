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
setup_ai_tools() {
    log "🤖 Installing AI CLI tools..."

    # Install/update aider via pipx
    if command -v pipx &> /dev/null; then
        if pipx list | grep -q "aider-chat"; then
            log "   Upgrading aider..."
            pipx upgrade aider-chat || log_warning "   Failed to upgrade aider"
        else
            log "   Installing aider..."
            pipx install aider-chat || log_warning "   Failed to install aider"
        fi
    else
        log_warning "   pipx not found, skipping aider installation"
    fi

    # Install GitHub Copilot CLI if not present
    if ! command -v github-copilot-cli &> /dev/null; then
        if command -v npm &> /dev/null; then
            log "   Installing GitHub Copilot CLI..."
            npm install -g @githubnext/github-copilot-cli || log_warning "   Failed to install GitHub Copilot CLI"
        fi
    fi

    # Install Gemini CLI if not present (using pnpm since it's available)
    if ! command -v gemini &> /dev/null; then
        if command -v pnpm &> /dev/null; then
            log "   Installing Gemini CLI..."
            pnpm add -g @google/generative-ai-cli || log_warning "   Failed to install Gemini CLI"
        fi
    fi

    # Claude CLI is already installed via pnpm
    if command -v claude &> /dev/null; then
        log_success "   ✓ Claude CLI found"
    else
        if command -v pnpm &> /dev/null; then
            log "   Installing Claude CLI..."
            pnpm add -g @anthropic-ai/claude-cli || log_warning "   Failed to install Claude CLI"
        fi
    fi

    # Note about VS Code extensions (Continue.dev and Cline)
    log "   📝 Note: Continue.dev and Cline are VS Code extensions (not CLI tools)"
    log "      They should be installed via VS Code Extensions panel or devcontainer.json"

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
