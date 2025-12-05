# Dependabot Configuration

This document explains the Dependabot configuration for DevMagic and the rationale behind the settings.

## Overview

DevMagic uses Dependabot to automatically keep dependencies up to date across multiple ecosystems. The configuration is designed to balance keeping dependencies current with minimizing PR noise and review overhead.

## Configuration Structure

The configuration monitors four distinct ecosystems:

### 1. Root Workspace (`/`)

**Purpose**: Monitors the root `package.json` which contains development tooling used across the entire project.

**What it includes**:
- `git-cliff` - Changelog generation
- `husky` - Git hooks
- `lint-staged` - Staged file linting
- `prettier` - Code formatting
- `turbo` - Monorepo build system

**Update strategy**:
- **Schedule**: Weekly on Monday at 9 AM (São Paulo time)
- **Grouping**: All minor and patch updates grouped together into a single PR
- **Major updates**: Come separately for careful review
- **PR limit**: Maximum 5 open PRs
- **Commit prefix**: `chore:` (appears in changelog under "Maintenance" section)

### 2. Website Workspace (`/www`)

**Purpose**: Monitors the Next.js website application in the `www/` directory.

**What it includes**:
- Production dependencies: `next`, `next-intl`, `react`, `react-dom`, `js-yaml`
- Development dependencies: TypeScript, ESLint, Tailwind CSS, type definitions

**Update strategy**:
- **Schedule**: Weekly on Monday at 9 AM (São Paulo time)
- **Grouping**: Two separate groups:
  - **Production dependencies**: Core runtime packages grouped together
  - **Dev dependencies**: Build tools and type definitions grouped together
- **Major updates**: Come separately for careful review
- **PR limit**: Maximum 5 open PRs
- **Commit prefix**: `chore:` (appears in changelog under "Maintenance" section)
- **Labels**: `dependencies`, `javascript`, `website`

**Rationale**: Separating production and dev dependencies allows reviewing runtime changes separately from tooling changes.

### 3. GitHub Actions (`/`)

**Purpose**: Keeps GitHub Actions workflow dependencies up to date.

**What it includes**:
- `actions/checkout` - Repository checkout action
- `orhun/git-cliff-action` - Changelog generation in CI
- `stefanzweifel/git-auto-commit-action` - Auto-commit for changelog

**Update strategy**:
- **Schedule**: Monthly on Monday at 9 AM (São Paulo time)
- **Grouping**: All actions grouped together into single PR
- **PR limit**: Maximum 3 open PRs
- **Commit prefix**: `chore:` (appears in changelog under "Maintenance" section)
- **Labels**: `dependencies`, `github-actions`

**Rationale**: GitHub Actions updates are less frequent and typically more stable, so monthly updates are sufficient.

### 4. Docker (`/.devcontainer/devcontainers/alpine`)

**Purpose**: Monitors base Docker images used in dev containers.

**What it includes**:
- `mcr.microsoft.com/devcontainers/base:alpine-3.21` - Alpine Linux base image

**Update strategy**:
- **Schedule**: Monthly on Monday at 9 AM (São Paulo time)
- **PR limit**: Maximum 2 open PRs
- **Commit prefix**: `chore:` (appears in changelog under "Maintenance" section)
- **Labels**: `dependencies`, `docker`, `devcontainer`

**Rationale**: Base image updates are infrequent but important for security. Monthly checks ensure we stay current without excessive noise.

## Design Decisions

### Why Group Updates?

**Problem**: Without grouping, Dependabot could create dozens of individual PRs for related package updates (e.g., updating 10 TypeScript type packages = 10 separate PRs).

**Solution**: Grouping combines related updates into single PRs, dramatically reducing review overhead while still keeping dependencies current.

### Why Separate Major Updates?

**Rationale**: Major version updates can introduce breaking changes and require careful review. By excluding major updates from groups, they come in separate PRs where they can be properly evaluated and tested.

### Why Different Schedules?

- **Weekly (npm)**: JavaScript dependencies change frequently; weekly updates keep the project modern
- **Monthly (GitHub Actions, Docker)**: These dependencies are more stable; monthly updates balance currency with noise reduction

### Why Open Pull Request Limits?

**Purpose**: Prevents overwhelming the maintainer with too many open dependency PRs.

**Limits**:
- npm packages: 5 PRs (higher frequency, more updates expected)
- GitHub Actions: 3 PRs (lower frequency, fewer updates)
- Docker: 2 PRs (very stable, infrequent updates)

### Why Commit Message Prefixes?

**Rationale**: Using `chore:` prefix ensures dependency updates are properly categorized in the automatically generated CHANGELOG.md (via git-cliff). This keeps the changelog organized and readable.

### Why Timezone Setting?

**Rationale**: Set to `America/Sao_Paulo` to align with the maintainer's timezone, ensuring PRs arrive during working hours for timely review.

## What Gets Updated Automatically?

### ✅ Automatically Grouped (Single PR)

- Minor and patch updates for npm dependencies
- All GitHub Actions updates (any version)
- All Docker base image updates (any version)

### ⚠️ Separate PRs (Require Individual Review)

- Major version updates for npm dependencies
- Any update that doesn't match grouping patterns

## Ignoring Dependencies

If certain dependencies should not be auto-updated, add an `ignore` configuration:

```yaml
- package-ecosystem: "npm"
  directory: "/www"
  # ... other config ...
  ignore:
    # Ignore all updates for a specific package
    - dependency-name: "package-name"
    # Ignore only major updates
    - dependency-name: "another-package"
      update-types: ["version-update:semver-major"]
```

## Testing the Configuration

The configuration is automatically validated by GitHub when merged. To test locally:

```bash
# Validate YAML syntax
python3 -c "import yaml; yaml.safe_load(open('.github/dependabot.yml'))"
```

## Monitoring Dependabot Activity

After merging this configuration:

1. **Check Dependabot tab** in GitHub repository → Insights → Dependency graph → Dependabot
2. **Review PRs** with the `dependencies` label
3. **Monitor logs** in the Dependabot tab if updates aren't appearing as expected

## Expected PR Volume

With this configuration, expect approximately:

- **Weekly**: 2-4 PRs (grouped npm updates for root + www)
- **Monthly**: 1-3 PRs (GitHub Actions + Docker updates)
- **Ad-hoc**: Major version updates as they're released

**Total**: ~12-20 PRs per month (down from potentially 50+ without grouping)

## Future Improvements

Potential enhancements to consider:

1. **Version pinning**: Pin specific dependencies to avoid unwanted updates
2. **Security-only updates**: Configure some ecosystems for security updates only
3. **Custom schedules**: Different days for different ecosystems to spread out review load
4. **Auto-merge**: Enable auto-merge for low-risk updates (e.g., type definitions)

## References

- [Dependabot Configuration Options](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file)
- [Grouping Dependency Updates](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file#groups)
- [Conventional Commits](https://www.conventionalcommits.org/)
