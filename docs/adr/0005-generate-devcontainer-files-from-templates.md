# 0005 - Generate Devcontainer Files from Templates

**Status:** Accepted

**Date:** 2026-07-14

**Deciders:** Marcelo Almeida (repository owner)

## Context

The Docker Compose based devcontainer setup (introduced in PR #77, superseding [ADR 0001](0001-use-dev-container-features.md)'s features-only approach as the main recommendation) has values that must stay identical across two files:

- `devcontainer.json` sets `workspaceFolder` to `/workspaces/<project>`.
- `docker-compose.yml` mounts the workspace at `/workspaces/<project>` and uses the same name for the Compose project, hostname, and image tag.

The first iteration synced them at runtime: a `.env` file next to the compose file held `COMPOSE_PROJECT_NAME`, Compose interpolated it, and `devcontainer.json` derived the same value from `${localWorkspaceFolderBasename}` — matching only by convention.

**Problems:**

1. **Out-of-sync risk** — rename the folder, edit `.env`, or sanitize the name, and the two files silently disagree; the container starts with the wrong or missing workspace path.
2. **Spec limitation** — `devcontainer.json` cannot read `.env`. Its `${localEnv:VAR}` substitution reads _host environment variables_, and no lifecycle hook runs early enough to inject values into it (`initializeCommand` runs after substitution; the rest run inside the container).
3. **User burden** — users had to understand `.env`, keep it matching the folder name, and fight `.env*` gitignore rules to commit it.

## Decision

Generate the devcontainer files from templates at install time, baking every shared value in:

1. Templates live in `templates/devcontainer/` (`devcontainer.json`, `docker-compose.yml`, `Dockerfile`) with two placeholders: `{{PROJECT_NAME}}` (project folder name) and `{{USER}}` (container username, `node` for the current base image — filled everywhere so paths, `remoteUser`, `user:` and the Dockerfile stay consistent).
2. The installer (`setup/devmagic.sh`, served at `devmagic.run/install`) downloads the templates, replaces the placeholders (project name sanitized to Compose naming rules), and writes ready-to-use files into `.devcontainer/`. No placeholders or env files are left behind.
3. This repository commits a **filled copy** in `.devcontainer/` (generated for the name `devmagic`), so the standalone and contribute-to-DevMagic workflows keep working with a plain clone + "Reopen in Container".
4. `setup/generate.sh` fills the templates locally — used to regenerate this repo's `.devcontainer/` after editing the templates, or by anyone working from a checkout.

`${localEnv:VAR:fallback}` remains in the templates for genuinely host-dependent values (TZ, locale), which is what it is designed for.

## Alternatives Considered

### Option 1: `.env` + convention (previous iteration)

Compose reads `.env`; `devcontainer.json` derives the same value from `${localWorkspaceFolderBasename}`. Rejected: the values are only equal by convention, the failure mode is silent, and `.env` adds setup surface (gitignore fights, docs, manual edits) for a value the installer already knows.

### Option 2: Fixed mount path (e.g. `/workspace`)

Mounting at a constant path removes the coupling entirely. Rejected: loses the informative `/workspaces/<project>` path and per-project Compose naming (container/hostname/image collisions across projects), and still leaves the Compose project name to configure separately.

### Option 3: Lifecycle hook sourcing `.env`

Rejected as impossible for the values that matter: hooks cannot influence `devcontainer.json` substitution (see Context), and the structural values are consumed before any hook runs.

## Consequences

### Positive

- Shared values cannot drift — they are written once, by one tool, into all files.
- No `.env`/`.env.example` in generated projects; nothing extra to commit or explain.
- Installer output is plain, readable files with no runtime indirection.
- The template folder gives DevMagic a natural home for future templates beyond the devcontainer (editorconfig, prettier, changelog tooling, ...).

### Negative

- Renaming a project folder requires re-running the installer (or `setup/generate.sh`) instead of editing one `.env` line — though the file header documents this.
- The repo's `.devcontainer/` is generated output committed to git; editing it directly instead of the templates reintroduces drift (mitigated by the file headers pointing at the templates and by `setup/generate.sh`).

### Neutral

- Values like the DB password in the commented example service still use Compose's host-env interpolation (`${DEVMAGIC_DB_PASSWORD:-...}`), which works without any `.env` file.

## Notes

- Supersedes the runtime-sync design briefly present during PR #77 review.
- Related: [ADR 0001](0001-use-dev-container-features.md) (features remain available on top of the built image), [ADR 0002](0002-automatic-dotfiles-installation.md) (dotfiles are now bind-mounted; the setup script is an opt-in `postCreateCommand`).
- Discussion: https://github.com/marcelocra/devmagic/pull/77
