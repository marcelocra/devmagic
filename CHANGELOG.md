# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.1] - 2025-11-25

### Fixed

- Dev container build failure due to missing configuration
- AI CLI tool package names (corrected to `@google/gemini-cli`, `@anthropic-ai/claude-code`, `@github/copilot`)
- Use `pnpm` instead of `npm` for global package installation
- Aider installation now uses official installer script (no Python/pipx dependency)

## [0.2.0] - 2025-11-25

### Added

- Architecture documentation (`docs/ARCHITECTURE.md`) with design principles and separation of concerns
- Website `/docs/architecture` page with interactive documentation
- Dotfiles integration section in README and CONTRIBUTING
- AI CLI tools automatically installed in container:
    - via pnpm
        - Claude Code
        - Gemini CLI
        - GitHub Copilot CLI
    - via pipx: `aider` (AI pair programming)
- VS Code extensions for AI development:
    - Cline (`saoudrizwan.claude-dev`)
    - Continue.dev (`continue.continue`)
- One-command installer for adding DevMagic to any project: `curl -fsSL https://devmagic.run/install | bash`
- Structured bash script with `main()` function pattern
- Official Dev Container Features for all tooling:
    - `common-utils:2` - Zsh with Oh My Zsh, tmux, utilities
    - `docker-in-docker:2` - Docker with Compose v2
    - `git-lfs:1` - Git Large File Support
    - `git:1` - Latest Git
    - `github-cli:1` - GitHub CLI
    - `node:1` - Node.js LTS with pnpm support

### Changed

- **BREAKING**: Migrated from custom bash setup scripts to official Dev Container Features
- **BREAKING**: Simplified container setup to SSH keys and AI CLI tools only
- **BREAKING**: Moved all devcontainer files to `.devcontainer/` directory (was mixed root/subdirectory)
- Renamed "Consumer mode" to "Add to Your Project" in documentation
- Updated website to prioritize installer approach and remove git submodule workflow
- Website migrated from Astro to Next.js 15 with App Router
- Shell history and editor configuration now handled by user dotfiles
- Improved documentation clarity throughout website and README

### Removed

- Custom package installation scripts (replaced by Features)
- Git submodule workflow documentation (replaced with installer approach)
- Legacy `.devcontainer/devcontainer-setup.conf` configuration file
- Duplicate setup script files

### Fixed

- VS Code extension ID for Cline (was incorrect `saaspegasus.cline`, now `saoudrizwan.claude-dev`)
- Website `/setup` route now correctly serves `devcontainer-setup.sh`
- Variable naming in website route handlers

## [0.1.0] - 2025-11-16

### Added

- Initial release of DevMagic portable development environment
- VS Code Dev Container configuration with pre-built images
- Auxiliary services via Docker Compose profiles:
    - PostgreSQL database
    - Redis cache
    - MongoDB document store
    - MinIO object storage
    - Ollama for local LLMs
- Automatic mounting of host credentials (SSH, GitHub, Claude)
- Pre-configured VS Code extensions for productivity
- Documentation website at devmagic.run
- Setup script endpoint with version pinning support (`/setup@version`)
- Installation script endpoint (`/install`)
- Apache 2.0 license
- Comprehensive documentation and getting started guides

[unreleased]: https://github.com/marcelocra/devmagic/compare/v0.2.1...HEAD
[0.2.1]: https://github.com/marcelocra/devmagic/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/marcelocra/devmagic/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/marcelocra/devmagic/releases/tag/v0.1.0
