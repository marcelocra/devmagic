# From Custom Scripts to Dev Container Features: A Refactoring Journey

**Date:** November 2025
**Author:** Marcelo Almeida

---

## TL;DR

Key learnings from refactoring DevMagic's dev container setup:

1. **Use Official Features** — Replace custom bash scripts with [Dev Container Features](https://containers.dev/features) for tooling (Node.js, Git, Docker-in-Docker). Reduces maintenance, improves reliability.

2. **Separate Concerns** — Container infrastructure (DevMagic) ≠ personal preferences (dotfiles). Keep them in separate repos with a clean handoff.

3. **Homebrew > Conda for CLI Tools** — Better package availability, no licensing issues, no conflicts.

4. **Custom Forks for Security** — Fork security-critical tools (fzf, zsh plugins) to your own repos. Audit before updating.

5. **One Script, One Purpose** — `install.sh` for one-time setup, `init.sh` for runtime config. No shared utils—each script self-contained.

6. **Credential Mounts are Read-Only** — Mount SSH keys read-only, then copy to container with proper permissions.

7. **Version-Pinned Endpoints** — Serve scripts via `/setup@v0.1.0` for reproducibility.

8. **Structured Bash with `main()`** — Use a main function pattern in bash for cleaner, testable scripts.

---

## Deep Dive

### 1. Replace Custom Scripts with Official Features

**Before:** A 200+ line bash script installing Node.js, Git, Docker, and other tools manually.

**After:** A `features` section in `devcontainer.json`:

```json
"features": {
  "ghcr.io/devcontainers/features/common-utils:2": {},
  "ghcr.io/devcontainers/features/docker-in-docker:2": {},
  "ghcr.io/devcontainers/features/git:1": {},
  "ghcr.io/devcontainers/features/github-cli:1": {}
}
```

**Why it matters:**

- Features are maintained by Microsoft/community
- Version pinning built-in (`:2`, `:1`)
- No more debugging package manager differences across base images
- Configuration options via feature parameters

**Keep custom scripts for:** SSH key setup (permission handling), AI CLI tools, and calling user dotfiles.

---

### 2. Separation of Concerns: Infrastructure vs Preferences

The most important architectural decision: **DevMagic handles container infrastructure, dotfiles handle personal preferences.**

```
DevMagic (container setup)         Dotfiles (personal preferences)
─────────────────────────────      ─────────────────────────────
✓ SSH key permissions              ✓ Homebrew packages
✓ AI CLI tools installation        ✓ Shell plugins (fzf, zsh-*)
✓ Container-specific config        ✓ VS Code settings/keybindings
✓ Calling dotfiles install.sh      ✓ Aliases, functions, PATHs
```

**The handoff:** DevMagic's `devcontainer-setup.sh` calls `~/prj/dotfiles/shell/install.sh` if it exists. Graceful fallback if missing.

**Benefits:**

- DevMagic works for everyone (no personal opinions baked in)
- Your dotfiles work everywhere (not just containers)
- Clean git history in both repos
- Easy to debug issues in isolation

---

### 3. Homebrew Over Conda for CLI Tools

When installing CLI tools like fzf, babashka, or hugo:

| Aspect               | Homebrew ✅ | Conda                      |
| -------------------- | ----------- | -------------------------- |
| Package availability | Wide        | Python-centric             |
| Licensing            | Free, open  | Commercial concerns        |
| Conflicts            | None        | Known issues with Homebrew |
| Container support    | Works great | Heavier footprint          |

**Decision:** Use Homebrew (via the official Feature or manual install in dotfiles) for non-language-specific CLI tools.

---

### 4. Custom Forks for Security-Critical Tools

For tools that run arbitrary code or have shell integration:

```bash
# In dotfiles/shell/install.sh
git clone https://github.com/marcelocra/fzf ~/.fzf
git clone https://github.com/marcelocra/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
```

**Why fork?**

- Review changes before pulling
- Pin to known-good commits
- No supply chain attacks from upstream
- Full audit trail

**When to fork:** Fuzzy finders, shell plugins, anything that processes your input or modifies your shell.

---

### 5. One Script, One Purpose

**`install.sh`** — One-time setup (runs once per container creation):

- Install packages
- Create symlinks
- Clone repos
- Must be **idempotent** (safe to run multiple times)

**`init.sh`** — Runtime config (sourced on every shell start):

- Set PATHs
- Define aliases and functions
- Source completions
- Must be **fast** (no network calls, no installations)

**No shared utils:** Each script is self-contained. Copy helper functions if needed. Simplicity > DRY for bash scripts that rarely change together.

---

### 6. Read-Only Credential Mounts

SSH keys need special handling:

```json
"mounts": [
  "source=${localEnv:HOME}/.ssh,target=/home/node/.ssh-from-host,type=bind,readonly"
]
```

Then in `devcontainer-setup.sh`:

```bash
cp -r ~/.ssh-from-host/. ~/.ssh
chmod 700 ~/.ssh
find ~/.ssh -type f -exec chmod 600 {} \;
```

**Why not mount directly to `~/.ssh`?**

- Read-only prevents accidental key modification
- Copying allows setting proper permissions
- Container user may differ from host user

---

### 7. Version-Pinned Script Endpoints

Scripts served via API routes with version support:

```bash
# Latest (cached 5 min)
curl -fsSL https://devmagic.run/setup | bash

# Pinned version (cached 1 year)
curl -fsSL https://devmagic.run/setup@v0.1.0 | bash
```

Implementation uses Vercel rewrites to extract version, then fetches from GitHub raw URLs:

```typescript
const version = pathname.includes("@") ? pathname.split("@")[1] : "main";
const url = `https://raw.githubusercontent.com/user/repo/${version}/path/to/script.sh`;
```

---

### 8. Structured Bash with main()

Pattern for readable, maintainable bash scripts:

```bash
#!/usr/bin/env bash
set -e

# Logging helpers
log() { echo -e "\033[0;34m$1\033[0m"; }
log_success() { echo -e "\033[0;32m$1\033[0m"; }
log_warning() { echo -e "\033[1;33m$1\033[0m"; }
log_error() { echo -e "\033[0;31m$1\033[0m"; }

# Feature functions
setup_ssh_keys() {
    # ...
}

setup_ai_tools() {
    # ...
}

# Entry point
main() {
    log "🔧 Starting setup..."
    setup_ssh_keys
    setup_ai_tools
    log_success "✅ Complete!"
}

main
```

**Benefits:**

- Functions can be tested independently
- Clear execution flow
- Easy to add/remove features
- Colored output helps debugging

---

## Summary: The Final Architecture

```
User runs: curl devmagic.run/install | bash
    ↓
Creates .devcontainer/ in project
    ↓
VS Code: "Reopen in Container"
    ↓
Features install: Git, Node.js, Docker, etc.
    ↓
postCreateCommand: curl devmagic.run/setup | bash
    ↓
devcontainer-setup.sh:
  ├─ SSH keys (copy + chmod)
  ├─ AI CLI tools (pnpm global)
  └─ Calls ~/prj/dotfiles/shell/install.sh
        ↓
    install.sh (user's dotfiles):
      ├─ Homebrew
      ├─ CLI tools (fzf, etc.)
      ├─ Zsh plugins
      └─ VS Code symlinks
```

**Result:** From "fresh OS" to "coding" in minutes. Reproducible. Portable. No magic.

---

## Related Resources

- [DevMagic Architecture](/docs/ARCHITECTURE.md) — Full technical documentation
- [Contributing Guide](/CONTRIBUTING.md) — Development workflow
- [Dev Container Features](https://containers.dev/features) — Official feature registry
- [Conventional Commits](https://conventionalcommits.org) — Commit message format for changelog automation
