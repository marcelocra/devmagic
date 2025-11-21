#!/usr/bin/env bash
# DevMagic Container Setup Script
# Handles SSH keys and other container-specific setup
# This runs once when the container is created (postCreateCommand)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging helper
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

log "🔧 Running DevMagic container setup..."

# ---------------------------------------------------------------------------
# SSH Key Setup
# ---------------------------------------------------------------------------
# Setup SSH keys with proper permissions.
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
# Main execution
# ---------------------------------------------------------------------------
setup_ssh_keys

log_success "✅ DevMagic container setup complete!"
log "ℹ️  Shell history is configured via dotfiles (~/prj/dotfiles/shell/init.sh)"
