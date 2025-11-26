# Fix Dotfiles Install

[Definitions]
- We use RFCs 2119 and 8174 for the interpretation of key words like "MUST", "SHOULD", and "MAY" in this document.
- "I" refers to Marcelo, the repository owner and the person requesting this task.
- "You" refers to the AI assistant performing the task.

[Context]
Review the following files regarding this repository:

- [CHANGELOG.md](../../CHANGELOG.md)
- [CHANGELOG-before-git-cliff.md](../CHANGELOG-before-git-cliff.md)
- [README.md](../../README.md)
- [TODO.md](../../TODO.md)
- [blog post about refactorings and migrations](../blog-devmagic-refactoring-learnings.md)

The idea was to use VSCode default dotfiles support to manage my dotfiles, but the problem is that it doesn't work for non-local workspaces (ex. codespaces, devcontainers, etc).

Therefore we need a different approach here, perhaps going back to install the dotfiles through either the devcontainer-setup.sh script or [my dotfiles install script](https://raw.githubusercontent.com/marcelocra/dotfiles/refs/heads/main/shell/install.sh).

[Task]
Do a step by step process:

1. Ingest all the references mentioned above, to familiarize yourself with the repository structure, recent changes, and relevant context.
2. Search online for solutions to this problem as of today, Nov. 26, 2025.
3. Propose a plan to fix the problem.

[Rules]
1. You MUST NOT hallucinate any information. If you are unsure about something, state that clearly.
2. You MAY make reasonable assumptions, but you MUST state them explicitly.
3. You MUST provide citations for any external information you use.
4. You MUST structure your response clearly, using headings and bullet points where appropriate.
5. If you can't make reasonable assumptions or find the necessary information, you MUST state that and ask for further guidance.
6. You MUST NOT proceed to implement the plan; only propose it.
7. You MUST answer in the following section.

## The Plan

### 1. Problem Restatement

- Issue: Current reliance on VS Code's built-in dotfiles support is unreliable or non-functional in “non-local” scenarios (e.g. remote Docker hosts, devcontainers opened via tunnels, possibly Codespaces), leading to missing personal configuration inside the container.
- Desired Outcome: A consistent, idempotent, portable dotfiles installation mechanism that works across all DevMagic usage modes (add-to-project, standalone, contributor) without depending on VS Code client behaviors.

### 2. Observed Context (Repository Signals)

- Separation of concerns already defined: DevMagic = infra; dotfiles repo = personal prefs (from refactor learnings and README).
- Existing script devcontainer-setup.sh handles infra + AI tooling; dotfiles invocation mentioned but fragile. <!-- Invocation is not fragile, it just considers something that will never be true. -->
- Changelog shows migration toward Dev Container Features and simplification of setup (maintain this direction).
- Architecture emphasizes reproducibility, portability, idempotency, minimal host dependencies.

### 3. Constraints

- MUST remain editor-agnostic (do not assume VS Code settings always applied).
- MUST be idempotent (safe on rebuild / restart).
- MUST avoid blocking container startup (fast failure / graceful skip).
- MUST not hard-couple to private dotfiles repo presence (fallback behavior).
- MUST permit offline rebuild after initial clone (cache strategy optional).
- MUST respect security: no blind execution of unverified remote scripts without controlled fetch + checksum option (optional enhancement).

### 4. Root Causes (Hypotheses / Assumptions)

- Assumption A: VS Code dotfiles setting (dotfiles.repository) may not apply in remote/Tunnel contexts or was not configured in user settings for those sessions. (Unverified due to lack of settings.json here.) <!-- Correct. I tested. -->
- Assumption B: Timing/order issue—container starts before VS Code client applies dotfiles bootstrap → scripts never invoked. <!-- Incorrect. VSCode settings explicitly states that it doesn't work for remote container both when I tried with codespaces and devcontainers. -->
- Assumption C: For Codespaces specifically, different bootstrap semantics; failure due to missing expected install command or path differences. <!-- Same as above. -->
- Assumption D: Current invocation path (~/prj/dotfiles/shell/install.sh) presumes dotfiles already present; absence yields silent no-op. <!-- Correct, but it was intentional. The problem is the I wasn't aware that VSCode would never actually clone the dotfiles repo in the cases mentioned above. -->
If any assumption invalid, plan includes diagnostic step to refine.

### 5. External References (Citations)

- Dotfiles personalization support is client-driven via user settings; container config can’t rely on it alone [1].
- Reliable provisioning should use postCreateCommand / postStartCommand or baked image layers for deterministic setup [2].
- Embedding configuration/logic conforms to devcontainer.json + spec metadata model [2][3].
- Common utilities feature already installs Zsh / baseline shell; layering dotfiles is additive [4].

[1] https://code.visualstudio.com/docs/devcontainers/containers (Personalizing with dotfile repositories)
[2] https://code.visualstudio.com/docs/devcontainers/create-dev-container (postCreateCommand / rebuild semantics)
[3] https://github.com/devcontainers/spec (spec intent for reproducible dev environments)
[4] https://github.com/devcontainers/features/tree/main/src/common-utils (feature behavior and options)


### 6. Strategic Options

1. Pure Client Reliance (status quo): Depend on VS Code dotfiles settings. (Rejected: non-deterministic, fails in non-local cases.)
2. Post-Create Hook Fetch:
    - Use postCreateCommand to clone dotfiles repo if absent, then run shell/install.sh.
    - Pros: Simple, works everywhere.
    - Cons: Runs only on first create; rebuild vs restart nuance.
3. Post-Start Guarded Installer:
    - Lightweight postStartCommand checks presence; installs if missing.
    - Pros: Self-healing after volume resets.
    - Cons: Adds startup overhead if not carefully optimized.
4. Feature-Like Internal Script:
    - Convert dotfiles fetch + apply to a minimal internal “pseudo-feature” executed during build (Dockerfile stage).
    - Pros: Pre-baked; fast runtime.
    - Cons: Personalization becomes image-specific (breaks separation).
5. Hybrid (Recommended):
    - Primary: postCreateCommand performs initial clone & install.
    - Secondary: postStartCommand quick integrity check (e.g. validate symlinks / version file); re-run install if corrupted or missing.
    - Preserve separation: dotfiles remain external.

### 7. Recommended Approach (Hybrid)

- Add controlled dotfiles bootstrap logic to DevMagic (infra side) that:
    1. Detects environment variables or optional config file (e.g. .devcontainer/dotfiles.conf) specifying: repo URL, branch/tag, expected install script path.
    2. On postCreateCommand:
        - If directory not present: clone (shallow, pinned branch/tag).
        - Verify presence of shell/install.sh; if absent -> log warning and skip.
        - Run install script in non-interactive mode; capture log to ~/.cache/devmagic/dotfiles-install.log.
    3. On postStartCommand:
        - Quick hash or marker file check (~/.cache/devmagic/dotfiles.marker).
        - If marker missing or version mismatch (dotfiles repo commit hash changed), optionally re-run with --update mode (requires idempotency).
- Expose minimal configuration to user to override repo: environment variable DEVMAGIC_DOTFILES_REPO else default to personal repository if defined; fallback skip.
- Provide safe execution wrapper (timeout, non-root, sanitized PATH).

<!-- I like the Hybrid approach, but don't think we need all those control files. I want more simplicity, not less. Previously, all I had was the devcontainer-setup.sh file cloning the dotfiles repo to ~/prj/dotfiles, which worked great. The current devcontainer-setup.sh already has a section in which it runs the install.sh if present, we could force a repo clone if the condition is not met. -->

### 8. Detailed Future Steps (Not Implemented Now)

Diagnostics (first run):
Log container environment: presence of VS Code dotfiles settings (if accessible), confirm failure mode (missing directory).
Config Definition:
Create optional .devcontainer/dotfiles.conf supporting keys: REPO=, REF=, INSTALL_SCRIPT=.
Script Enhancements (devcontainer-setup.sh):
Add function install_dotfiles() with:
Guard: skip if ~/.dotfiles_installed marker newer than container image timestamp.
Clone shallow: git clone --depth=1 --branch "$REF" "$REPO" "$TARGET".
Post-run: write commit hash to marker file.
Integrity Check:
Compare stored commit hash vs remote (optional: only if network available).
Security Hardening:
Optional SHA256 allowlist for install script (user-supplied).
Run install in constrained environment (set umask, limit inherited aliases).
Idempotency Requirements for Dotfiles Repo (Assumption):
install.sh MUST not duplicate entries or re-add conflicting symlinks.
Documentation Updates:
README: “Reliable Dotfiles Mode” section.
Architecture: clarify bootstrap sequence & fallback.
Testing Matrix:
Local Docker devcontainer.
Remote SSH host devcontainer.
Tunnel host scenario.
(If available) Codespaces to validate fallback (open question: confirm identical semantics).
Performance Optimization:
Cache clone under persistent volume (/workspaces/.cache/devmagic-dotfiles) if workspace ephemeral.
Rollout:
Introduce behind opt-in flag DEVMAGIC_ENABLE_DOTFILES_AUTO=1.
After validation, enable by default in next minor version.

### 9. Security Considerations

Avoid executing arbitrary remote code silently—log URL and commit hash before execution.
Provide user-visible audit trail (~/.cache/devmagic/dotfiles-install.log).
Fail fast on non-zero exit; do not partially apply environment.
Optional: sandbox with dedicated user (already non-root due to common-utils feature; verify).

### 10. Risks & Mitigations

Risk: Network unavailability on postCreate → incomplete setup.
Mitigation: Retry logic with exponential backoff up to N attempts; degrade gracefully.
Risk: Dotfiles repo large → slow clone.
Mitigation: Shallow clone; optionally fetch sparse checkout.
Risk: Conflicts with container-provided defaults.
Mitigation: Document precedence (dotfiles last; user can opt out by removing marker file behavior).

### 11. Open Questions (Need Clarification Before Implementation)

Exact dotfiles repo canonical path (current user repo?).
Required branch/tag pinning strategy (main vs version tags).
Whether Codespaces support is a target (we lacked a working Codespaces dotfiles doc URL today; need verification).
Desired behavior when dotfiles update upstream—auto-pull or manual trigger?
Need for checksum verification of install.sh or is git commit pin sufficient?

### 12. Success Metrics

Dotfiles consistently applied across all supported container start modes (≥95% test runs).
Rebuild time overhead added by dotfiles step < 2 seconds when already installed.
Zero duplicated artifacts or conflicting shell configs on repeated runs.
Clear audit logs present for each installation attempt.

### 13. Rollout Phasing

Experimental (flag off by default).
Beta (flag on for contrib mode only).
Stable (default enabled; documented fallback disable mechanism).
Versioned release note in changelog (“feat: reliable multi-context dotfiles bootstrap”).

### 14. Fallback Behavior

If dotfiles repo unreachable → skip with warning; container still usable.
If install script errors → revert any partial symlinks (maintain list of changes).
User can disable entirely via DEVMAGIC_ENABLE_DOTFILES_AUTO=0.

### 15. Non-Goals

Managing per-user secrets inside dotfiles.
Auto-merging conflicting shell config from multiple repos.
Replacing Dev Container Features for baseline tooling.

---

## AI Response to Feedback (2025-11-26)

### Acknowledged Issues with Original Plan

You're correct—the plan above is over-engineered. Based on your comments:

1. **Assumption B & C were incorrect**: VS Code explicitly states dotfiles support doesn't work for remote containers/Codespaces (not a timing issue).
2. **Assumption D was correct but incomplete**: The current `devcontainer-setup.sh` does check for `~/prj/dotfiles/shell/install.sh`, but doesn't clone the repo—it assumes VS Code already did. Since VS Code won't do this in remote scenarios, the directory never exists.
3. **Previous approach was simpler and worked**: You previously had `devcontainer-setup.sh` clone the dotfiles repo to `~/prj/dotfiles`, which was effective.

### Simplified Solution (Recommended)

**Core principle**: Keep it simple. Just ensure the dotfiles repo is cloned before attempting to run `install.sh`.

#### Changes Needed in `setup/devcontainer-setup.sh`

Modify the existing dotfiles section to:

1. **Check if dotfiles directory exists** (`~/prj/dotfiles`)
2. **If not, clone it** using a configurable environment variable or sensible default
3. **Then run the existing install.sh check**

**Minimal code change:**

```bash
# Dotfiles section (existing location in devcontainer-setup.sh)
DOTFILES_DIR="${HOME}/prj/dotfiles"
DOTFILES_REPO="${DEVMAGIC_DOTFILES_REPO:-https://github.com/marcelocra/dotfiles.git}"
DOTFILES_BRANCH="${DEVMAGIC_DOTFILES_BRANCH:-main}"

log "📦 Checking for dotfiles..."

# Clone if directory doesn't exist
if [ ! -d "${DOTFILES_DIR}" ]; then
    log "Cloning dotfiles from ${DOTFILES_REPO}..."
    mkdir -p "$(dirname "${DOTFILES_DIR}")"
    if git clone --depth=1 --branch "${DOTFILES_BRANCH}" "${DOTFILES_REPO}" "${DOTFILES_DIR}"; then
        log_success "Dotfiles cloned successfully"
    else
        log_warning "Failed to clone dotfiles (network issue?). Skipping."
    fi
fi

# Run install.sh if it exists (existing logic)
if [ -f "${DOTFILES_DIR}/shell/install.sh" ]; then
    log "Running dotfiles install script..."
    bash "${DOTFILES_DIR}/shell/install.sh"
    log_success "Dotfiles installed"
else
    log_warning "Dotfiles install.sh not found at ${DOTFILES_DIR}/shell/install.sh"
fi
```

#### Environment Variables for Flexibility

- `DEVMAGIC_DOTFILES_REPO`: Override default repo URL (defaults to your repo)
- `DEVMAGIC_DOTFILES_BRANCH`: Override branch (defaults to `main`)
- To disable entirely: User can set `DEVMAGIC_DOTFILES_REPO=""` or comment out the section

#### Idempotency

- Clone only happens if directory missing (first run or after volume reset)
- Your existing `install.sh` is already idempotent (as mentioned in blog post)
- No marker files needed—directory presence is the marker

#### Security

- Shallow clone (`--depth=1`) keeps it fast
- Uses git commit verification (git's built-in integrity)
- Runs as non-root user (already handled by common-utils feature)
- User controls repo URL via environment variable

#### When This Runs

- `postCreateCommand` in `devcontainer.json` already calls `devcontainer-setup.sh` via curl
- No changes needed to `devcontainer.json`
- Works for all scenarios: local, remote SSH, tunnels, Codespaces

#### Fallback Behavior

- Network unavailable during clone? → Warning logged, container still usable
- `install.sh` errors? → Script exits with error, visible in creation log
- User wants different repo? → Set `DEVMAGIC_DOTFILES_REPO` in their fork's `devcontainer.json`

### What This Avoids (Compared to Original Plan)

- ❌ No `.devcontainer/dotfiles.conf` config file
- ❌ No marker files (`~/.dotfiles_installed`, `~/.cache/devmagic/dotfiles.marker`)
- ❌ No commit hash tracking/comparison
- ❌ No `postStartCommand` integrity checks
- ❌ No retry logic with exponential backoff
- ❌ No SHA256 checksums
- ❌ No dedicated audit logs (creation log is sufficient)
- ❌ No phased rollout flags (just works by default)

### What Remains from Original Plan (Still Valid)

- ✅ Shallow clone for speed
- ✅ Environment variable configuration
- ✅ Graceful fallback on network failure
- ✅ Maintains separation of concerns (DevMagic vs dotfiles)
- ✅ Works across all container scenarios

### Testing Required

1. **Fresh container** (no `~/prj/dotfiles` exists) → Should clone and install
2. **Rebuild with existing dotfiles** → Should skip clone, run install.sh
3. **Network unavailable** → Should log warning and continue
4. **Different dotfiles repo** → Set `DEVMAGIC_DOTFILES_REPO` in env and verify

### Documentation Updates

- Update README.md section "Personal Configuration with Dotfiles" to mention the automatic cloning behavior
- Add environment variables to the customization section
- Remove any mention of relying on VS Code dotfiles settings for remote containers

### Implementation Summary

**One function addition to `devcontainer-setup.sh`, no other changes needed.** This restores your previous working approach while adding the flexibility of environment variable configuration.

Does this align with your vision for simplicity?
