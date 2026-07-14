# 0006 - Serve Generic Project Templates Through the Installer Registry

**Status:** Accepted

**Date:** 2026-07-14

**Deciders:** Marcelo Almeida (repository owner)

## Context

[ADR 0005](0005-generate-devcontainer-files-from-templates.md) introduced `templates/` as the source of truth for the devcontainer files and noted that the folder "gives DevMagic a natural home for future templates beyond the devcontainer". Meanwhile, a set of default files travels by hand into every new project (`.editorconfig`, `.prettierrc`, `.gitignore`, `cliff.toml` + changelog workflow, husky/lint-staged configs), and the website already had the beginnings of a generic installer: `www/app/install/[script]/route.ts` serves bash scripts by id from a YAML registry (`www/data/install-scripts.yml`), with `@version` pinning and query params.

DevMagic can therefore grow from "devcontainer generator" into a "dev things generator" with little new machinery: the hero copy ("Your Development Environment, Anywhere — Zero host installation. Cross-platform. Consistent.") already covers it.

## Decision

1. `templates/` centralizes all new-project defaults, one folder per group: `devcontainer/` (ADR 0005), `editorconfig/`, `prettier/`, `gitignore/`, `changelog/`. Template files whose names would self-apply to this repo (`.gitignore`, `.editorconfig`, `.prettierrc`, `.prettierignore`) are stored WITHOUT the leading dot and mapped to their real destination by the registry, so the repo's own tooling never accidentally honors them.
2. The registry (`www/data/install-scripts.yml`) gains a `templates:` list alongside `scripts:`. A template entry declares `id`, `name`, `description`, `files` (src in the repo → dest in the user's project) and optional `notes`. Ids are unique across both lists.
3. `devmagic.run/install/{id}` handles both kinds: script entries are fetched from the repo and served as before; template entries get a small bash installer **generated on the fly** that curls each file from `raw.githubusercontent.com/<ref>` to its destination. `@version` pinning works for both. Generated installers never overwrite existing files unless the URL carries `?force=1`.
4. A `devcontainer` script entry aliases the main installer, so `devmagic.run/install/devcontainer` and `devmagic.run/install` do the same thing.
5. The `/install-scripts` page renders both sections from the registry, so adding a template is a YAML entry + a folder — no code changes.

## Alternatives Considered

### Option 1: One static installer script per template group

A `setup/install-<thing>.sh` per group (like `install-prettier.sh`). Rejected for plain file groups: every script would re-implement the same download loop, and file lists would live in two places (script + docs). Scripts remain the right tool when real logic is needed (the prettier script edits package.json, installs packages, configures husky).

### Option 2: Serve archives (tar/zip) per group

Rejected: `curl | bash` is the established UX, an archive needs a second tool and manual placement, and per-file skip/force semantics would be lost.

### Option 3: Client-side manifest parsing

A single generic script that downloads and parses a manifest per group. Rejected: parsing YAML/JSON portably in bash requires jq/yq (not guaranteed on fresh machines); generating the installer server-side keeps the client dependency at exactly `curl` + `bash`.

## Consequences

### Positive

- Adding a template = drop files in `templates/<group>/` + one YAML entry; the endpoint and catalog page pick it up automatically.
- Version pinning (`/install/changelog@v0.3.0`) comes for free via the existing `@ref` handling.
- Generated installers are tiny, readable, and safe by default (skip existing files).

### Negative

- Template content is duplicated where an existing script also embeds it (e.g. `install-prettier.sh` heredocs vs `templates/prettier/`); until the script is refactored to download from `templates/`, the two copies can drift.
- The generated installer interpolates registry values into bash; the registry is repo-controlled (not user input), but registry edits must keep src/dest paths free of shell metacharacters.

### Neutral

- The `{{PROJECT_NAME}}`/`{{USER}}` placeholder filling remains exclusive to the devcontainer flow (`setup/devmagic.sh`). Plain template groups are copied verbatim, with one light exception: the generated installer fills a `{{REPO_URL}}` placeholder (used by the changelog template's release links) with the project's git origin URL, detected at install time and validated to URL-safe characters, falling back to an obvious `YOUR_ORG/YOUR_REPO` placeholder with a warning.

## Notes

- Related: [ADR 0005](0005-generate-devcontainer-files-from-templates.md) (template folder and devcontainer generation).
- Future: refactor `setup/install-prettier.sh` to source its config files from `templates/prettier/` instead of heredocs; add more groups (VS Code settings, license, CI workflows) as needed.
