# Contributing to DevMagic

Thank you for your interest in contributing to DevMagic! This is primarily a personal project, but contributions are welcome and appreciated.

## Development Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/marcelocra/devmagic.git
   cd devmagic
   ```

2. **Open in VS Code and "Reopen in Container"**

   The repository includes a dev container configuration that provides everything you need for development.

3. **For website development:**

   ```bash
   cd www
   npm install
   npm run dev
   ```

   The site will be available at `http://localhost:4321`

## Making Changes

### General Guidelines

- **Use conventional commits** (e.g., `feat:`, `fix:`, `docs:`) - see below for details
- **Test your changes locally** before submitting
- **Update documentation** if your changes affect usage or configuration
- **Follow the existing code style** and project structure

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for automatic changelog generation:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring without changing functionality
- `test:` - Test changes
- `chore:` - Maintenance tasks (dependencies, build config, etc.)
- `perf:` - Performance improvements

**Examples:**

```bash
feat: add support for custom base images
fix: correct PostgreSQL environment variable name
docs: update getting started guide with troubleshooting
chore: update dependencies
```

### Pull Request Process

1. **Fork the repository** and create a new branch from `main`
2. **Make your changes** following the guidelines above
3. **Test thoroughly** - especially if modifying dev container config
4. **Update documentation** if needed
5. **Submit a pull request** with a clear description of your changes

## Development Workflows

### Working on the Dev Container

If you're modifying `.devcontainer/devcontainer.json` or related files:

1. Make your changes
2. **Rebuild the container** to test: Command Palette → "Dev Containers: Rebuild Container"
3. Verify everything works as expected
4. Update documentation if you've changed configuration options

### Working on the Website

The website lives in the `www/` folder and is built with Astro:

1. Make your changes in `www/src/`
2. Test locally with `npm run dev`
3. Build to verify: `npm run build`
4. The built site goes to `docs/` for GitHub Pages

### Working on Setup Scripts

The scripts in `setup/` are served via the website endpoints:

- `setup/devmagic.sh` → served at `/install`
- `setup/devcontainer-setup.sh` → served at `/setup` (with version support)

**Important:** These scripts should be:

- **Idempotent** - safe to run multiple times
- **Well-commented** - explain what each section does
- **Tested** - try them in a fresh container

## Adding to the Showcase

To add your project to the showcase:

1. Click [here](https://github.com/marcelocra/devmagic/edit/main/www/src/data/showcase.yml) to edit the showcase file
2. Add your project following the existing format:

   ```yaml
   - name: "Your Project Name"
     url: "https://github.com/yourusername/yourproject"
     description: "Brief description of your project and how you use DevMagic"
     author: "yourusername"
   ```

3. GitHub will guide you through creating a fork and pull request
4. That's it!

## Reporting Issues

Found a bug or have a feature request?

1. **Search existing issues** to avoid duplicates
2. **Use the issue templates** if available
3. **Provide details:**
   - What you expected to happen
   - What actually happened
   - Steps to reproduce
   - Your environment (OS, Docker/Podman version, VS Code version)

## Questions?

If you have questions about contributing, feel free to:

- Open an issue with the `question` label
- Check existing issues and discussions
- Reach out on GitHub

## Code of Conduct

Be respectful, constructive, and helpful. We're all here to make development environments better!

## License

By contributing to DevMagic, you agree that your contributions will be licensed under the Apache License 2.0.

---

**Thank you for contributing to DevMagic!** 🚀
