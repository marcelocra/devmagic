# DevMagic Website

This is the source code for the DevMagic documentation website, built with Astro and hosted at [devmagic.run](https://devmagic.run).

## Tech Stack

- **[Astro](https://astro.build)** - Static site generator
- **[Tailwind CSS v4+](https://tailwindcss.com)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** - UI component system
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript

## Development

### Prerequisites

- Node.js 22 or later
- pnpm 10 or later (install with `npm install -g pnpm`)

### Getting Started

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start development server:**

   ```bash
   pnpm run dev
   ```

   The site will be available at `http://localhost:4321`

3. **Build for production:**

   ```bash
   pnpm run build
   ```

   The built site will be output to `../docs/` (for GitHub Pages)

4. **Preview production build:**

   ```bash
   pnpm run preview
   ```

### Available Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build production site to `../docs/`
- `pnpm run preview` - Preview production build locally
- `pnpm run astro` - Run Astro CLI commands
- `pnpm run changelog` - Generate/update CHANGELOG.md from git history

## Project Structure

```
www/
├── src/
│   ├── pages/              # Routes and pages
│   │   ├── index.astro    # Homepage
│   │   ├── setup/         # /setup endpoint with versioning
│   │   └── install.ts     # /install endpoint
│   ├── layouts/            # Page layouts
│   │   └── BaseLayout.astro
│   ├── components/         # Reusable components
│   │   ├── Button.astro
│   │   └── CodeBlock.astro
│   ├── styles/            # Global styles
│   │   └── global.css
│   └── data/              # Data files
│       └── showcase.yml   # Projects using DevMagic
├── public/                # Static assets (copied as-is)
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

## How It Works

### Build Process

1. **Source** - Website pages and components in `src/`
2. **Build** - Astro compiles to static HTML/CSS/JS
3. **Output** - Built files go to `../docs/` (GitHub Pages requirement)
4. **Deploy** - GitHub Actions commits built files and GitHub Pages serves them

### Special Endpoints

The website serves the DevMagic setup scripts via special endpoints:

#### `/install`

Serves the latest installation script from `setup/devmagic.sh`:

```bash
curl -fsSL https://devmagic.run/install | bash
```

Implementation: `src/pages/install.ts`

#### `/setup` (with versioning)

Serves the setup script with optional version pinning:

```bash
# Latest (main branch)
curl -fsSL https://devmagic.run/setup | bash

# Specific version
curl -fsSL https://devmagic.run/setup@v0.1.0 | bash

# Specific commit
curl -fsSL https://devmagic.run/setup@abc123f | bash
```

Implementation: `src/pages/setup/[[ref]].ts`

These endpoints fetch the scripts from GitHub at runtime and serve them as plain text.

### Versioned Routes

The `/setup` endpoint supports version pinning via the URL path:

- `/setup` → latest from main branch
- `/setup@v0.1.0` → from git tag v0.1.0
- `/setup@abc123f` → from commit hash abc123f

At runtime, the endpoint:

1. Extracts the version/ref from the URL
2. Fetches the script from GitHub raw URL
3. Serves it as plain text with appropriate cache headers

## Content Management

### Adding a New Page

1. Create a new `.astro` file in `src/pages/`
2. Use the `BaseLayout` component for consistent styling
3. Add navigation link in `src/layouts/BaseLayout.astro`

Example:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="My Page - DevMagic">
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-4">My Page</h1>
    <p>Content goes here...</p>
  </div>
</BaseLayout>
```

### Updating the Showcase

Edit `src/data/showcase.yml` to add projects:

```yaml
projects:
  - name: "Your Project"
    url: "https://github.com/user/repo"
    description: "Brief description"
    author: "username"
```

### Styling Guidelines

- Use **Tailwind utility classes** for styling
- Follow **shadcn/ui** component patterns
- Support both **light and dark modes** (automatic theme detection)
- Keep **responsive design** in mind (mobile-first approach)

## Deployment

### GitHub Pages Setup

1. Enable GitHub Pages in repository settings
2. Set source to "Deploy from a branch"
3. Select `main` branch and `/docs` folder
4. Configure custom domain (optional): `devmagic.run`

### Automatic Deployment

On every push to `main` that changes files in `www/`:

1. GitHub Actions runs the deploy workflow
2. Installs dependencies and builds the site
3. Commits the built files to `docs/`
4. GitHub Pages automatically deploys the changes

See `.github/workflows/deploy-site.yml` for the full workflow.

### Manual Deployment

If needed, you can manually build and commit:

```bash
# Build the site
pnpm run build

# Commit the built files
git add ../docs
git commit -m "build: update website"
git push
```

### Handling the `docs/` Folder

The `docs/` folder is **auto-generated** from the build process and may cause merge conflicts when pulling changes. To avoid this:

1. **Git Attributes:** The repository includes `.gitattributes` that marks `docs/**` with `merge=ours` strategy
2. **Configure merge driver:** Run this once in your local clone:
   ```bash
   git config merge.ours.driver true
   ```
3. **After any merge/pull:** If you see conflicts in `docs/`, just rebuild:
   ```bash
   cd www
   pnpm run build
   ```

The `merge=ours` strategy will automatically use your local version during conflicts, then you rebuild to get the correct output.

## Troubleshooting

### Build Errors

- **Check Node.js version:** Must be 22 or later
- **Clear cache:** Delete `node_modules` and `pnpm-lock.yaml`, then `pnpm install`
- **Check Astro errors:** Run `pnpm run astro check` for type errors

### Development Server Issues

- **Port already in use:** Change port with `pnpm run dev -- --port 3000`
- **Hot reload not working:** Restart the dev server

### Deployment Issues

- **GitHub Actions failing:** Check the Actions tab for error logs
- **Changes not appearing:** Verify `docs/` was committed and pushed
- **404 errors:** Ensure GitHub Pages is enabled and configured correctly

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on contributing to the website.

## License

Apache 2.0 - See [LICENSE.md](../LICENSE.md) for details.
