# 0002 - Automatic Dotfiles Installation

**Status:** Accepted

**Date:** 2025-11-26

**Deciders:** Marcelo Almeida (repository owner)

## Context

DevMagic users need personal configuration (shell aliases, editor settings, CLI tools) that differs from the base container infrastructure. Initially, we relied on VS Code's built-in dotfiles support via user settings:

```json
{
  "dotfiles.repository": "username/dotfiles",
  "dotfiles.targetPath": "~/prj/dotfiles"
}
```

**Problem:** VS Code explicitly states this feature doesn't work for remote containers (devcontainers, Codespaces, remote SSH/tunnel hosts). Testing confirmed dotfiles were never cloned in these scenarios, leaving containers without personal configuration.

This violates DevMagic's portability goal - containers should work consistently across all usage modes (local, remote, Codespaces).

## Decision

Implement automatic dotfiles cloning in `devcontainer-setup.sh`:

```bash
# Check if dotfiles directory exists
if [ ! -d "$HOME/prj/dotfiles" ]; then
    # Clone using environment variables
    git clone --depth=1 --branch "$DEVMAGIC_DOTFILES_BRANCH" \
              "$DEVMAGIC_DOTFILES_REPO" "$HOME/prj/dotfiles"
fi

# Run install script if present
if [ -f "$HOME/prj/dotfiles/shell/install.sh" ]; then
    bash "$HOME/prj/dotfiles/shell/install.sh"
fi
```

Configuration via environment variables in `devcontainer.json`:

```json
{
  "containerEnv": {
    "DEVMAGIC_DOTFILES_REPO": "https://github.com/username/dotfiles.git",
    "DEVMAGIC_DOTFILES_BRANCH": "main"
  }
}
```

**Important:** Use `containerEnv` (not `remoteEnv`) because these variables must be available during `postCreateCommand` execution. The Dev Container specification confirms that `containerEnv` sets variables at container creation time, making them accessible to all processes including lifecycle scripts. `remoteEnv` variables are only set after VS Code connects to the container, which happens after `postCreateCommand` completes.

## Alternatives Considered

### Option 1: Continue relying on VS Code settings

**Rejected** because:
- Explicitly doesn't work for remote containers
- Non-deterministic behavior
- Breaks portability promise
- Editor-dependent

### Option 2: Complex marker file system

**Rejected** because:
- Over-engineered for the problem
- Would need commit hash tracking, integrity checks, marker files
- Directory presence is sufficient marker
- Violates "simplicity over cleverness"

### Option 3: Dockerfile-baked dotfiles

**Rejected** because:
- Breaks separation of concerns (DevMagic = infrastructure, dotfiles = personal)
- Makes personalization image-specific
- Can't share DevMagic images publicly

### Option 4: postStartCommand integrity checks

**Rejected** because:
- Adds startup overhead
- Unnecessary if install script is idempotent (which it must be anyway)
- Directory presence check is sufficient

## Consequences

### Positive

- **Works everywhere** - Local, remote SSH, tunnels, Codespaces
- **Simple implementation** - ~20 lines of bash
- **User control** - Environment variables for repo/branch
- **Graceful fallback** - Logs warning if clone fails, container still usable
- **Fast** - Shallow clone (`--depth=1`)
- **Idempotent** - Only clones if directory missing
- **No coupling** - Users can disable via `DEVMAGIC_DOTFILES_REPO=""`

### Negative

- **Network dependency** - Requires internet on first container creation
- **User responsibility** - Install script must be idempotent
- **Default repo hardcoded** - Defaults to maintainer's repo (acceptable for personal project)

### Neutral

- Directory presence is the "marker" - no separate marker files needed
- No automatic updates - users rebuild container for fresh clone
- Documentation updated across README, ARCHITECTURE, website

## Notes

- Planning discussion: `docs/ai-chats/fix-dotfiles-install.md`
- User dotfiles must have `shell/install.sh` at standard location
- Install script should handle: Homebrew, fzf, zsh plugins, VS Code symlinks
- Related: [0001 - Use Dev Container Features](0001-use-dev-container-features.md)

**Security:**
- Shallow clone minimizes exposure
- Git provides commit verification
- Runs as non-root user (via common-utils feature)
- User controls repo URL

**Testing:**
- Fresh container (no dotfiles) → should clone and install
- Rebuild with existing dotfiles → should skip clone, run install
- Network unavailable → should log warning and continue
- Custom repo → set `DEVMAGIC_DOTFILES_REPO` environment variable
