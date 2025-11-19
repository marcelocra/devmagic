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
- **Next.js** for website (previously Astro - migration in progress)
- **React 19** for UI components
- **Tailwind CSS v4+** for styling
- **shadcn/ui** for UI components
- **Vercel/GitHub Pages** for hosting

## Architecture

### Dev Container

- Uses pre-built Ubuntu images with Node.js
- Mounts host credentials (SSH, GitHub, Claude) read-only
- Supports multiple base images via configuration
- Includes pre-configured VS Code extensions

### Website

- Built with Next.js and React 19
- Serves setup scripts via dynamic endpoints:
  - `/install` - latest installation script
  - `/setup` - setup script with optional version pinning (`/setup@v0.1.0`)
- Uses App Router for routing and API routes
- TypeScript for type safety

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
// Next.js API routes or App Router route handlers
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const version = searchParams.get('version') || 'main';
  const url = `https://raw.githubusercontent.com/marcelocra/devmagic/${version}/path/to/file`;
  // Fetch and return
}
```

### Component Structure

```tsx
// Next.js React component with TypeScript
interface Props {
  title: string;
  children?: React.ReactNode;
}

export function Component({ title, children }: Props) {
  return (
    <div className="component">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
```

## Testing Approach

- **Dev container changes:** Rebuild container and verify all mounted credentials work
- **Website changes:** Run `pnpm run dev` in `www/` directory
- **Setup scripts:** Test in fresh container, ensure idempotency
- **Build process:** Run `pnpm run build` and verify output
- **Linting:** Run `pnpm run lint` to check code style

## File Organization

```
devmagic/
├── .devcontainer/          # Dev container config
├── setup/                  # Scripts served via endpoints
├── www/                    # Website source (Next.js)
│   ├── app/               # Next.js App Router pages and routes
│   │   ├── api/          # API routes
│   │   └── ...           # Page routes
│   ├── components/        # Reusable React components
│   ├── data/             # Data files and configs
│   ├── public/           # Static assets
│   └── ...               # Config files (next.config.ts, etc.)
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

## Security Considerations

- **Credentials:** Never copy secrets into containers - always mount read-only from host
- **Docker socket:** Dev container needs Docker socket access for auxiliary services (security risk acknowledged)
- **Environment variables:** Use `.env` files for configuration, never commit secrets
- **Setup scripts:** Validate all downloaded content before execution
- **Dependencies:** Regularly update base images and dependencies to patch vulnerabilities

## Common Pitfalls and Known Issues

### Credential Mounting
- Different base images have different default users
- The `remoteUser` setting must match the image's user for mounts to work
- Check `.devcontainer/devcontainer.json` when switching base images

### Docker-in-Docker
- Requires privileged mode or Docker socket mounting
- Not all container runtimes support all features identically
- Podman and Docker may have slight differences in behavior

### Script Idempotency
- Setup scripts run on every container creation
- Must check if tools are already installed before installing
- Use conditional logic: `if ! command -v tool &> /dev/null; then ... fi`

### Build Artifacts
- Next.js build output should not be committed (`.next/`, `.vercel/`)
- Ensure `.gitignore` is properly configured
- Use deployment platforms (Vercel) for production builds

### Pnpm Store
- Pnpm store can become large over time
- Excluded via `.gitignore` - don't commit it
- May need periodic cleanup in development

## CI/CD Information

- **Current setup:** No automated CI/CD workflows (manual deployment)
- **Future consideration:** GitHub Actions for automated testing and deployment
- **Deployment:** Website can be deployed to Vercel or similar platforms
- **Version tagging:** Create git tags for versioned setup scripts
