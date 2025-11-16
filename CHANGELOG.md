# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-16

### Added

- Initial release of DevMagic portable development environment
- Support for three usage modes: standalone, consumer (git submodule), and maintainer
- VS Code Dev Container configuration with pre-built Ubuntu images
- Auxiliary services via Docker Compose profiles:
  - PostgreSQL database
  - Redis cache
  - MongoDB document store
  - MinIO object storage
  - Ollama for local LLMs
- Automatic mounting of host credentials (SSH, GitHub, Claude)
- Pre-configured VS Code extensions for productivity
- Documentation website at devmagic.run built with Astro
- Setup script endpoint with version pinning support (`/setup@version`)
- Installation script endpoint (`/install`)
- Apache 2.0 license
- Comprehensive documentation and getting started guides
- Showcase page for projects using DevMagic

[0.1.0]: https://github.com/marcelocra/devmagic/releases/tag/v0.1.0
