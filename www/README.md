# DevMagic Website

This is the source code for the DevMagic documentation website, built with Next.js and hosted at [devmagic.run](https://devmagic.run).

## Tech Stack

- **[Next.js 16](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - UI library
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework
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

   The site will be available at `http://localhost:3000`

3. **Build for production:**

   ```bash
   pnpm run build
   ```

4. **Preview production build:**

   ```bash
   pnpm run start
   ```

### Available Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build production site
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint

## Project Structure

```
www/
├── app/
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── getting-started/   # Pages (App Router)
│   ├── features/
│   ├── docs/
│   ├── showcase/
│   ├── changelog/
│   ├── about/
│   ├── install/
│   │   └── route.ts       # /install endpoint with versioning
│   └── setup/
│       └── route.ts       # /setup endpoint with versioning
├── components/            # React components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── button.tsx
│   ├── code-block.tsx
│   ├── theme-toggle.tsx
│   └── theme-provider.tsx
├── data/                  # Data files
│   └── showcase.yml       # Projects using DevMagic
├── public/                # Static assets
├── next.config.ts         # Next.js configuration
├── tailwind.config.mjs    # Tailwind CSS configuration (v4)
├── tsconfig.json          # TypeScript configuration
├── vercel.json            # Vercel deployment config
└── package.json
```

## How It Works

### Deployment

The website is deployed to [Vercel](https://vercel.com) and automatically rebuilds when changes are pushed to the main branch.

### Special Endpoints

The website serves the DevMagic setup scripts via special API routes:

#### `/install` or `/install@version`

Serves the installation script from `setup/devmagic.sh`:

```bash
# Latest version
curl -fsSL https://devmagic.run/install | bash

# Specific version
curl -fsSL https://devmagic.run/install@v0.1.0 | bash
```

#### `/setup` or `/setup@version`

Serves the container setup script from `setup/devcontainer-setup.sh`:

```bash
# Latest version
curl -fsSL https://devmagic.run/setup | bash

# Specific version
curl -fsSL https://devmagic.run/setup@v0.1.0 | bash
```

The `@version` syntax is handled by Vercel rewrites (configured in `vercel.json`) which maps `/install@v0.1.0` to `/install` and extracts the version from the pathname in the route handler.

### Versioning

- Version tags in the URL correspond to Git tags/branches in the repository
- Scripts are fetched from GitHub raw URLs
- Caching: Latest (main) is cached for 5 minutes, tagged versions for 1 year

## Contributing

### Adding Your Project to the Showcase

Edit `data/showcase.yml` and submit a pull request:

```yaml
projects:
  - name: "Your Project Name"
    url: "https://github.com/username/project"
    description: "How you use DevMagic"
    author: "Your GitHub username"
```

## License

Apache 2.0 - See [LICENSE.md](../LICENSE.md)
