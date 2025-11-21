# DevMagic Refactor Plan — DevContainer Features First

Date: 2025-11-20

## Goals

- Reduce maintenance by replacing bespoke bash setup with official Dev Container Features/Templates.
- Keep security posture (pin versions, allow optional forks for specific tools).
- Provide clear alternatives: default, minimal, ultra-sensitive.
- Move all devcontainer-related files under `.devcontainer/`.
    - They were previously at root level with symlinks, so that the repo would work as a submodule.

## Requirements

- Use official Features where possible (Microsoft devcontainers/features).
- Pin Feature major versions (and minor where reasonable) for reproducibility.
- Keep dotfiles integration via VS Code built-in dotfiles support.
- Maintain current capabilities: Node+pnpm, Git+LFS, Docker (dind), zsh (oh-my-zsh), optional fzf, optional mise.
- Provide two alternatives:
    - `alternatives/minimal/devcontainer.json`: minimal footprint (no extras).
    - `alternatives/ultra-sensitive/devcontainer.json`: minimal + network isolation (`--network=none` or internal network).
- Add Option C vars to `devcontainer-setup.conf` to allow user forks for select repos (used by fallback manual path only).
- Update installer `setup/devmagic.sh` to download from `.devcontainer/` and mention alternatives.
- Update website routes to fetch new paths.

## Constraints & Assumptions

- Keep base images from `mcr.microsoft.com/devcontainers` (audited, widely used).
- Prefer Features over custom scripts; only keep manual steps as fallback.
- Do not introduce breaking changes to website URLs beyond path updates.
- Do not remove existing functionality unless superseded by Features.

## Design Choices (explicit)

- Base: `mcr.microsoft.com/devcontainers/base:debian`.
- Features (default):
    - `ghcr.io/devcontainers/features/common-utils:2` (zsh/oh-my-zsh, tmux, utils).
    - `ghcr.io/devcontainers/features/node:1` (Node LTS, pnpm, yarn).
    - `ghcr.io/devcontainers/features/git:1` and `git-lfs:1`.
    - `ghcr.io/devcontainers/features/github-cli:1`.
    - `ghcr.io/devcontainers/features/docker-in-docker:2` (Moby).
    - `ghcr.io/devcontainers/features/homebrew:1` (package manager for latest tools).
    - Optional extras: `ghcr.io/devcontainers-extra/features/fzf:1`, `ghcr.io/devcontainers-extra/features/zsh-plugins:0`, `ghcr.io/devcontainers-extra/features/mise:1`.
- Trustworthiness:
    - Official Features repo: https://github.com/devcontainers/features (Dev Container Spec Maintainers — Microsoft-backed). MIT licensed, wide usage, CI-tested, semantic versioned.
    - `devcontainers-extra` org: https://github.com/devcontainers-extra/features (community-led; numerous small Features; open CI). For higher assurance, pin exact versions and vendor a copy or fork (like your current fork strategy). Given your model, for extras (fzf/zsh-plugins/mise) a personal fork is reasonable but optional since Features are small and pinned.
- Forking policy:
    - Default: use upstream pinned Features.
    - Your personal use: keep private forks, optionally create local features in this repo (future work) for full control.

## Step-by-step Plan

1. Audit current devcontainer files and symlinks.
2. Create new `.devcontainer/devcontainer.json` using Features.
3. Create `.devcontainer/alternatives/minimal/devcontainer.json`.
4. Create `.devcontainer/alternatives/ultra-sensitive/devcontainer.json` with network isolation.
5. Move top-level devcontainer-related files under `.devcontainer/` (remove symlinks).
6. Update `setup/devmagic.sh` download map to point to `.devcontainer/...` and mention alternatives.
7. Update `.devcontainer/devcontainer-setup.conf` with Option C variables (user forks) — used only if fallbacks are invoked.
8. Update `www/app/install/route.ts` and `www/app/setup/route.ts` to point to new paths.
9. Quick docs touch-up (README pointers).
10. Sanity checks: validate JSON, basic lint.

## Open Questions (please confirm before I proceed past Step 2)

- Should we fully remove `setup/devcontainer-setup.sh` from default flow and keep it only as a fallback (not invoked by default)?
- For ultra-sensitive config, do you prefer `--network=none` or an internal network via docker-compose? (default proposal: `--network=none`).
- Keep Docker Compose file? If needed, move it under `.devcontainer/` and reference from alternatives that require services.

I will proceed with steps 1–2 and pause to confirm the Open Questions before continuing with network isolation specifics and script removal.
