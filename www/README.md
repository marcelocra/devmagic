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

4. **Preview production build:**

   ```bash
   pnpm run preview
   ```

### Available Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build production site
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
│   │   │   └── [[ref]].ts # Dynamic versioned setup endpoint
│   │   └── install.ts     # /install endpoint
│   ├── layouts/            # Page layouts
│   │   └── BaseLayout.astro
│   ├── components/         # Reusable components
│   │   ├── Button.astro
│   │   └── CodeBlock.astro
│   ├── styles/            # Global styles
│   │   └── global.css     # Tailwind v4 with custom theme
│   └── data/              # Data files
│       └── showcase.yml   # Projects using DevMagic
├── public/                # Static assets (copied as-is)
├── astro.config.mjs       # Astro + Vercel configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

## How It Works

### Build Process

1. **Source** - Website pages and components in `src/`
2. **Build** - Astro compiles with Vercel serverless adapter
3. **Deploy** - Vercel automatically deploys on push to main
4. **Serve** - Static pages served from edge, dynamic routes from serverless functions

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

The website is deployed on **Vercel** with automatic deployments on every push.

### Vercel Setup

1. Import the repository in Vercel
2. Set the root directory to `www/`
3. Vercel will automatically detect Astro and configure build settings
4. Configure custom domain: `devmagic.run`

### Automatic Deployment

Vercel automatically deploys:
- **Production**: Pushes to `main` branch → https://devmagic.run
- **Preview**: Pull requests → temporary preview URLs

### Environment Variables

No environment variables are required for the basic setup.

### Manual Deployment

Using Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
cd www
vercel

# Deploy to production
vercel --prod
```

## Troubleshooting

### Build Errors

- **Check Node.js version:** Must be 22 or later
- **Clear cache:** Delete `node_modules` and `pnpm-lock.yaml`, then `pnpm install`
- **Check Astro errors:** Run `pnpm run astro check` for type errors

### Development Server Issues

- **Port already in use:** Change port with `pnpm run dev -- --port 3000`
- **Hot reload not working:** Restart the dev server

### Deployment Issues

- **Build failing on Vercel:** Check the build logs in Vercel dashboard
- **404 errors:** Ensure routes are properly configured in `astro.config.mjs`
- **Dynamic routes not working:** Verify `output: 'hybrid'` and `prerender: false` for API routes

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on contributing to the website.

## License

Apache 2.0 - See [LICENSE.md](../LICENSE.md) for details.
