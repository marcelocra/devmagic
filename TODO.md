# DevMagic Refactor Plan — DevContainer Features First

Date: 2025-11-20
Completed: 2025-11-21

## Goals

- Reduce maintenance by replacing bespoke bash setup with official Dev Container Features/Templates.
- Keep security posture (pin versions, allow optional forks for specific tools).
- Move all devcontainer-related files under `.devcontainer/`.

## What Was Completed

### ✅ Migrated to Dev Container Features
- **Added official features:**
  - `ghcr.io/devcontainers/features/common-utils:2` - Zsh with Oh My Zsh, tmux, utilities
  - `ghcr.io/devcontainers/features/node:1` - Node.js LTS with pnpm/yarn support
  - `ghcr.io/devcontainers/features/git:1` - Latest Git
  - `ghcr.io/devcontainers/features/git-lfs:1` - Git Large File Support
  - `ghcr.io/devcontainers/features/github-cli:1` - GitHub CLI (`gh`)
  - `ghcr.io/devcontainers/features/docker-in-docker:2` - Docker with Compose v2
  - `ghcr.io/devcontainers/features/homebrew:1` - Homebrew package manager
- **Created minimal setup script:** `setup/container-setup.sh`
  - Only handles SSH key copying (from read-only mount)
  - Removed all package installation logic (now in Features)
  - History configuration handled by dotfiles (`~/prj/dotfiles/shell/init.sh`)

### ✅ File Organization
- **Moved to `.devcontainer/` directory:**
  - `devcontainer.json` (removed root duplicate)
  - `devcontainer.alpine.json`
  - `docker-compose.yml`
  - `Dockerfile.alpine`
  - `Dockerfile.example`
- **Deleted legacy files:**
  - `setup/devcontainer-setup.sh` (replaced by Features + minimal container-setup.sh)
  - `.devcontainer/devcontainer-setup.conf` (config no longer needed)

### ✅ Scripts & Endpoints
- **Installer:** `setup/devmagic.sh`
  - Downloads `.devcontainer/devcontainer.json`
  - Downloads `.devcontainer/docker-compose.yml`
  - Updated paths to new locations
- **Container setup:** `setup/container-setup.sh`
  - Minimal script (SSH keys only)
  - Called via `postCreateCommand` in devcontainer.json
- **Website routes:**
  - `/install` → serves `setup/devmagic.sh`
  - `/setup` → serves `setup/container-setup.sh`

### ✅ Documentation
- **Updated `README.md`:**
  - Replaced setup script instructions with Features explanation
  - Listed all included Features
  - Removed references to `.env` customization
- **Updated `www/README.md`:**
  - Corrected `/setup` endpoint documentation
  - Clarified what each endpoint serves

## Architecture Summary

**Dev Container Features handle:**
- Language runtimes (Node.js with pnpm/yarn via Features)
- Development tools (Git, GitHub CLI, Docker)
- Shell environment (Zsh with Oh My Zsh)
- Package managers (Homebrew for additional tools)

**Container setup script handles:**
- SSH key copying (from read-only mount to writable location)
- Permissions setup for SSH keys

**User dotfiles handle:**
- Shell history configuration (via `~/prj/dotfiles/shell/init.sh`)
- Editor configuration (EDITOR env var, VS Code aliases)
- AI CLI tools setup (if any)
- Additional shell customizations

## Key Decisions

1. **pnpm:** Comes with Node Feature, no additional setup needed
2. **History:** Handled by user dotfiles, respects `MCRA_HISTORY_DIR` env var
3. **Editor:** Configured in user dotfiles
4. **AI CLIs:** Can be installed via Homebrew or configured in dotfiles
5. **SSH keys:** Must be copied in container-setup.sh (from read-only mount)

## Environment Variables (in devcontainer.json)

- `MCRA_HISTORY_DIR` - Directory for persistent shell history (used by dotfiles)
- `WORKSPACE_FOLDER` - Current workspace path (for history file naming)
- `TZ`, `LC_ALL`, `LANG` - Locale and timezone settings
- `OLLAMA_HOST` - Optional Ollama API endpoint
