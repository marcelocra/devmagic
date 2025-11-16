# GitHub Copilot Instructions for DevMagic

## Project Context

DevMagic provides portable development environments using VS Code Dev Containers. The goal is to enable developers to go from "fresh OS" to "coding" in minutes with zero host installation (except container runtime + VS Code).

## Coding Standards

- **TypeScript** for website code (strict mode enabled)
- **Bash** for setup scripts (must be idempotent and well-commented)
- **Conventional commits** specification for version control
- **Clarity and maintainability** over cleverness or optimization

## Key Technologies

- **Dev Containers** with Docker/Podman for environment isolation
- **Astro** for static site generation (website)
- **Tailwind CSS v4+** for styling
- **shadcn/ui** for UI components
- **GitHub Pages** for hosting (builds to `docs/`)

## Architecture

### Dev Container

- Uses pre-built Ubuntu images with Node.js
- Mounts host credentials (SSH, GitHub, Claude) read-only
- Supports multiple base images via configuration
- Includes pre-configured VS Code extensions

### Website

- Static site built with Astro
- Serves setup scripts via dynamic endpoints:
  - `/install` - latest installation script
  - `/setup` - setup script with optional version pinning (`/setup@v0.1.0`)
- Builds from `www/src/` to `docs/` for GitHub Pages

### Auxiliary Services

- Optional services via Docker Compose profiles:
  - PostgreSQL, Redis, MongoDB, MinIO, Ollama
- Started on-demand from within dev container
- All services share a Docker network

## Common Patterns

### Setup Scripts

```bash
#!/usr/bin/env bash
# Scripts should be idempotent - safe to run multiple times

# Check before installing
if ! command -v tool &> /dev/null; then
    # Install tool
fi

# Use environment variables for configuration
VARIABLE="${VARIABLE:-default_value}"
```

### Website Endpoints

```typescript
// Dynamic endpoints fetch from GitHub
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  const version = params.version || 'main';
  const url = `https://raw.githubusercontent.com/marcelocra/devmagic/${version}/path/to/file`;
  // Fetch and return
};
```

### Component Structure

```astro
---
// Component logic (TypeScript)
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<!-- Template (HTML) -->
<div class="component">
  <h1>{title}</h1>
  <slot />
</div>

<style>
  /* Scoped styles (or use Tailwind) */
</style>
```

## Testing Approach

- **Dev container changes:** Rebuild container and verify all mounted credentials work
- **Website changes:** Run `npm run dev` in `www/` directory
- **Setup scripts:** Test in fresh container, ensure idempotency
- **Build process:** Run `npm run build` and verify `docs/` output

## File Organization

```
devmagic/
├── .devcontainer/          # Dev container config
├── setup/                  # Scripts served via endpoints
├── www/                    # Website source
│   ├── src/
│   │   ├── pages/         # Routes and pages
│   │   ├── components/    # Reusable components
│   │   ├── layouts/       # Page layouts
│   │   └── styles/        # Global styles
│   └── astro.config.mjs
├── docs/                   # Built website (auto-generated)
└── docker-compose.yml      # Auxiliary services
```

## Development Workflow

1. Make changes to dev container config or scripts
2. Test in actual dev container (rebuild if needed)
3. Update documentation to reflect changes
4. Use conventional commits for version history
5. Update CHANGELOG.md and create version tag if needed

## Conventional Commits

Use these prefixes for automatic changelog generation:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation only
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code restructuring without changing behavior
- `test:` - Adding or updating tests
- `chore:` - Updating build tasks, package manager configs, etc.
- `perf:` - Performance improvements

## Design Principles

1. **Zero friction** - Minimize steps from "fresh OS" to "coding"
2. **Consistency** - Same environment on every machine
3. **Modularity** - Start minimal, add services as needed
4. **Transparency** - Open source, well-documented, no magic
5. **Portability** - Works on Windows, Linux, macOS identically

## User Base

- Solo developers wanting portable environments
- Teams wanting consistent dev setups across members
- Projects wanting to provide easy onboarding
- Anyone tired of "works on my machine" problems
