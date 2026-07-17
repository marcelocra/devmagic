# 0001 - Unify Installer Implementation (Scripts vs. Generated Templates)

**Status:** Exploring

**Started:** 2026-07-14

**Participants:** Marcelo Almeida, AI pairing session (Claude Code)

## Problem

`www/app/install/[script]/route.ts` currently does two structurally different things depending on the id it's asked for, and the code that does the "template" side embeds a full bash script as a JS template literal with string interpolation.

## Context

[ADR 0006](../adr/0006-generic-template-installer.md) introduced the `templates:` registry entries and `generateTemplateInstaller()`, which builds a bash script on the fly (as a template string inside `route.ts`) that `curl`s each registered file to its destination. This sits alongside the pre-existing `scripts:` entries, which serve a bash file that already lives in the repo (`setup/*.sh`) more or less as-is (with a `PACKAGE_MANAGER` env var injected for the `prettier` script).

So today there are two paths that both end up "putting files into a new project," implemented two different ways:

1. **`scripts:`** — a real `.sh` file in `setup/`, containing arbitrary logic (e.g. `install-prettier.sh` edits `package.json`, installs Husky, configures lint-staged — not just file copies).
2. **`templates:`** — no file on disk; `route.ts` generates the installer text itself, string-building a bash script (heredoc-style JS template literal with `${...}` interpolation for paths, notes, the `REPO_URL` detection logic, etc).

This PR's ADR already flagged the seams:

> - Known duplication: `install-prettier.sh` still embeds the prettier config in heredocs; a future refactor can make it download from `templates/prettier/` instead.
> - `www/app/install/[script]/route.ts` ... Interpolated values are all registry-controlled.

## Discussion Log

## ~2026-07-14 (exact time not recorded; entry written up after the fact)

Marcelo, reviewing the merged PR:

> `[script]/route.ts` - this file seems to be doing a lot of stuff. Right now it is working, so let's merge as is: I still want to think more about it. Problems I currently have with it and you might have already mentioned in the ADR (do not fix them now, please): (a) The shell script embedded in it, with a bunch of string interpolation. Seems like something that should be in a template, using proper templating language and logic. (b) It might return a generated script that creates a file from a template OR a separate script (saved in the repo) that does the same thing, but differently, if I understood correctly. Edit: you mention this in the ADR already... I read the code before reading the ADR. I agree with you: next step could be unifying everything, moving shell scripts under 'setup' to 'templates'.

Claude's read on it: agreed on both counts. (a) is the more clear-cut win — moving the generated-installer logic out of a JS string and into an actual template file (checked into `templates/`, rendered with a real templating step, even if minimal) makes it reviewable, diffable, and testable the same way the devcontainer templates already are. (b) is more of a design question than a bug: `setup/*.sh` scripts carry real logic (install order, conditionals, `package.json` mutation) that plain file-copy templates can't express, so "unify everything" probably doesn't mean "delete one path" — it likely means giving both paths the same _shape_: templates live under `templates/`, and the registry entry says whether the id needs (a) a plain file-copy installer (today's `templates:` behavior) or (b) a scripted installer with real logic (today's `scripts:` behavior, but sourced from `templates/` instead of `setup/`). That would remove the `setup/` vs `templates/` split entirely and leave `route.ts` as a dispatcher instead of a generator.

## Options Considered

### Option 1: Move the generated-installer template into a real file

Keep the file-copy vs. scripted-logic distinction, but stop building the file-copy installer as a JS template literal in `route.ts`. Store it as an actual template file (e.g. `templates/_installer.sh.tmpl`) with `{{...}}` placeholders in the same style as the devcontainer templates, and have `route.ts` do simple substitution (or a minimal templating step) instead of string-building bash inline.

- **Pro:** the installer becomes reviewable/diffable like any other template; keeps today's split between `scripts:` and `templates:` (smaller change).
- **Con:** doesn't address point (b) — two mechanisms still exist for conceptually the same job.

### Option 2: Move `setup/*.sh` scripts under `templates/`, one registry entry type

Relocate `setup/devmagic.sh`, `setup/install-prettier.sh`, `setup/devcontainer-setup.sh`, `setup/generate.sh` under `templates/` (e.g. `templates/prettier/install.sh`, `templates/devcontainer/install.sh`), so all installable things live in one place regardless of whether they're a plain file-copy or a scripted installer with logic. The registry entry would declare which kind it is; `route.ts` becomes a thin dispatcher (serve-as-is for scripted entries, generate-from-template for file-copy entries) instead of containing the generation logic itself.

- **Pro:** one place (`templates/`) for everything a project can install; matches the `templates/` model already established by ADR 0005/0006; directly fixes the duplication ADR 0006 flagged (e.g. `install-prettier.sh` could pull its config from `templates/prettier/` instead of embedding a second copy in heredocs).
- **Con:** bigger change — touches every existing script path and reference (README, ADRs, the registry, `www/lib/install-scripts.ts`).

### Option 3: Do nothing further

Leave `route.ts` as-is; it works today and both paths are already registry-driven and reasonably well-tested.

- **Pro:** zero effort, zero regression risk.
- **Con:** the duplication and embedded-bash-in-JS concerns don't go away, and every new scripted installer added under `setup/` widens the gap Option 2 would close.

## Open Questions

- Is a "real templating language" (Option 1) worth adding as a dependency, or is placeholder substitution (already used for the devcontainer templates) good enough for the installer script too?
- If `setup/` moves under `templates/` (Option 2), does the distinction between "file-copy template" and "scripted installer" become a `type:` field in the registry, or an implicit fact about the entry (has a `files:` list vs. a `scriptPath:`)?
- Worth doing before or after more template groups are added? More groups added under the current split means more to migrate later.

## Decision

Not yet — intentionally left open. Revisit before adding the next scripted (non-file-copy) template, since each new one under `setup/` widens the gap Option 2 would close.

## Related

- [ADR 0005 - Generate Devcontainer Files from Templates](../adr/0005-generate-devcontainer-files-from-templates.md)
- [ADR 0006 - Serve Generic Project Templates Through the Installer Registry](../adr/0006-generic-template-installer.md)
- [PR #83](https://github.com/marcelocra/devmagic/pull/83) (merged; this RFC captures follow-up discussion from its review)
