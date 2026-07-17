# 🚀 DevMagic Environment

> [!NOTE]
> _If you just want to use it, run_:
>
> ```sh
> curl --proto '=https' --tlsv1.2 -fsSL https://devmagic.run/install | bash
> ```
>
> _(P.S.: It is always recommended to [see what you are running](https://devmagic.run/install) before doing so. The `--proto '=https' --tlsv1.2` flags refuse to silently downgrade to plain HTTP or an old TLS version — same ones [rustup](https://rustup.rs) and other installers use. Plain `curl -fsSL ... | bash` works too, just without that hardening.)_

## TL;DR

DevMagic can be used in **three different ways**:

1. **Add to Your Project (recommended)** — use the installer to add DevMagic to any existing project with one command.
2. **Standalone Environment** — use this repo directly as a portable dev environment (no need to install development tools on your host; just Docker + VS Code).
3. **Contribute to DevMagic** — work on `devmagic.run` itself (the website in the `www` folder), using its wrapper `.devcontainer`.

It also supports optional auxiliary services (see `.devcontainer/docker-compose.yml` for available options).

## Table of Contents

- [Add to Your Project](#consumer)
- [Standalone Usage](#standalone)
    - Requirements
    - Getting Started
    - Customizing the Setup
    - Temporary Workspace Workflow
- [Auxiliary Services](#aux)
    - Step 1: Open a Terminal in VS Code
    - Step 2: Start an Auxiliary Service
    - Step 3: Verify the Service is Running
    - Step 4: Connect to the Service
    - Step 5: Stopping a Service
- [Contribute to DevMagic](#maintainer)
- [Personal Configuration with Dotfiles](#dotfiles)

## Overview

This repository contains the core configuration for the DevMagic development environment.
You can **add it to your existing projects** with a single command, use it as a **standalone workspace**,
or use it to **develop DevMagic itself** (including the website hosted at devmagic.run).

## 🚀 Add to Your Project <a id="consumer"></a>

The easiest way to use DevMagic is to add it to your existing project:

```bash
curl --proto '=https' --tlsv1.2 -fsSL https://devmagic.run/install | bash
```

This downloads the DevMagic templates (from [`templates/devcontainer/`](templates/devcontainer)), fills in your project name, and writes **ready-to-use files** into a `.devcontainer/` folder in the current directory:

1. `devcontainer.json` — the Dev Container definition (Docker Compose based)
2. `docker-compose.yml` — the `dev` service, plus a commented example showing how to add auxiliary services (databases, AI tools, ...) behind [Compose profiles](https://docs.docker.com/compose/how-tos/profiles/)
3. `Dockerfile` — the dev image (Node.js/TypeScript base with tmux, Neovim, ripgrep, fd)

Every value that must match across the files (workspace mount path, Compose project name, hostname, image tag) is **generated in sync** from your project folder name — no `.env` files, no placeholders, nothing to keep aligned by hand.

Need different values? The project name and the container username can be overridden (flags > env vars > defaults):

```bash
# URL query params:
curl -fsSL "https://devmagic.run/install?name=my-app&user=node" | bash

# Flags:
curl -fsSL https://devmagic.run/install | bash -s -- --name my-app --user node

# Environment variables:
curl -fsSL https://devmagic.run/install | DEVMAGIC_PROJECT_NAME=my-app DEVMAGIC_USER=node bash
```

After running the installer:

1. Open your project in VS Code
2. Choose **"Reopen in Container"**
3. Your project now has a fully configured dev environment!

The dev container includes:

- Node.js 24 with TypeScript (Microsoft's `typescript-node` dev container image, pinned)
- Git, GitHub CLI and Zsh with Oh My Zsh
- tmux, Neovim, ripgrep and fd
- Timezone and locale **forwarded from your host** via `${localEnv:*}` (with sane fallbacks)
- Your `~/.config/dotfiles` folder mounted into the container (optional)
- A fast, isolated in-memory `/tmp` (tmpfs)
- VS Code extensions for AI-assisted development (Claude Code, GitHub Copilot)

> [!NOTE]
> This setup targets **Docker**. It should also work with Podman, but building
> through the Compose `build:` block can be unreliable there — see the note at
> the top of `.devcontainer/docker-compose.yml` for the manual-build alternative.

### Customizing Your Setup

Each file has a clear responsibility:

- `.devcontainer/Dockerfile` — system packages and the base image
- `.devcontainer/docker-compose.yml` — mounts, auxiliary services, container runtime options
- `.devcontainer/devcontainer.json` — [Dev Container Features](https://containers.dev/features), VS Code extensions, environment variables (prefer `${localEnv:VAR:fallback}` so host settings flow into the container)

If you rename your project folder, rerun the installer (or edit the project name consistently in both `devcontainer.json` and `docker-compose.yml` — the file headers list the affected values).

See the [official features list](https://github.com/devcontainers/features) for available options.

### More Project Templates

The devcontainer isn't the only thing DevMagic can set up. The same endpoint installs other new-project defaults from [`templates/`](templates) — an `.editorconfig`, a Node `.gitignore`, Prettier config, git-cliff changelog tooling, and more:

```bash
curl -fsSL https://devmagic.run/install/editorconfig | bash
curl -fsSL https://devmagic.run/install/gitignore | bash
curl -fsSL https://devmagic.run/install/changelog | bash
```

Existing files are never overwritten unless you add `?force=1` to the URL. Browse the full catalog at [devmagic.run/install-scripts](https://devmagic.run/install-scripts).

## 💻 Standalone Usage (Portable Dev Environment) <a id="standalone"></a>

You can use this repository **directly as your dev environment**. This is useful if:

- You are on a fresh OS installation,
- You don't want to install development tools on your host,
- You just want a temporary throw‑away workspace to hack on code.

### Requirements

- [Docker](https://www.docker.com/) (the setup targets Docker; [Podman](https://podman-desktop.io) works with a manually built image — see `.devcontainer/docker-compose.yml`)
- [Visual Studio Code](https://code.visualstudio.com/) (or any devcontainer‑compatible editor)

### Getting Started

1. Clone this repository:

    ```bash
    git clone https://github.com/marcelocra/devmagic.git
    cd devmagic
    ```

    > 💡 If you don't have `git` installed locally, you can download the repo as a zip from GitHub, since this environment itself provides Git.

2. Open the folder in VS Code and choose **"Reopen in Container."**

3. You now have a fully featured dev environment **without installing anything else** on the host system.

    > [!IMPORTANT]
    > Each image might have a different default user. Be sure to check the `remoteUser` setting in `.devcontainer/devcontainer.json` and adjust any paths that depend on the user, such as volume mounts.

    See `.devcontainer/devcontainer.json` for the current image and available configuration options. You can switch to different base images by editing this file.

### Customizing the Setup

The environment is defined by three small files:

1. `.devcontainer/Dockerfile` — add system packages or change the base image, then rebuild
2. `.devcontainer/docker-compose.yml` — mounts, auxiliary services, runtime options
3. `.devcontainer/devcontainer.json` — [Dev Container Features](https://containers.dev/features), VS Code extensions and environment variables (use `${localEnv:VAR:fallback}` to forward host values)

These files are generated from the templates in `templates/devcontainer/` (this repo's copy is pre-filled for the name `devmagic`; regenerate it with `./setup/generate.sh` after editing the templates). Rebuild the container for changes to take effect.

The devcontainer includes:

- Node.js 24 with TypeScript
- Git, GitHub CLI and Zsh with Oh My Zsh
- tmux, Neovim, ripgrep and fd
- Timezone/locale forwarded from your host via `${localEnv:*}`
- VS Code extensions for AI-assisted development (Claude Code, GitHub Copilot)

### Temporary Workspace Workflow

- Use this repo as a personal dev terminal/workstation.
- Whenever you need to work on another repo:

    ```bash
    git clone https://github.com/other/repo.git
    cd repo
    code .
    ```

- Each cloned repo automatically uses the same dev container setup.

This makes DevMagic a **portable coding box** you can carry
between machines or use on a fresh OS in minutes.

## Using Auxiliary Services <a id="aux"></a>

The dev container is the only service that starts by default. `.devcontainer/docker-compose.yml` ships with a commented PostgreSQL example showing the pattern for adding more services: define the service, attach it to `dev-network`, and put it behind a [Compose profile](https://docs.docker.com/compose/how-tos/profiles/) so it only runs when you ask for it.

To use one:

1. Uncomment (or add) the service in `.devcontainer/docker-compose.yml`.
2. Start and stop it on demand:

    ```bash
    docker compose -f .devcontainer/docker-compose.yml --profile postgres up -d
    docker compose -f .devcontainer/docker-compose.yml --profile postgres down
    ```

    Run this from the host at the project root.

3. Connect from the dev container using the service name as hostname (e.g. `postgres:5432`) — both containers share `dev-network`. `docker ps` shows everything running side by side, and stopping a service never affects your dev container.

## 🛠️ Contribute to DevMagic <a id="maintainer"></a>

If you want to **contribute to this repository** (including the devmagic.run website in the `www` folder):

1. Clone this repository:

    ```bash
    git clone https://github.com/marcelocra/devmagic.git
    cd devmagic
    ```

2. Open the repository in VS Code and choose **"Reopen in Container"**

3. For website development:
    ```bash
    cd www
    pnpm install
    pnpm run dev
    ```

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## 🔧 Personal Configuration with Dotfiles <a id="dotfiles"></a>

DevMagic mounts your personal dotfiles from the host into the container, keeping container infrastructure separate from personal preferences.

**How it works:**

1. `docker-compose.yml` bind-mounts `~/.config/dotfiles` (host) to `/home/node/.config/dotfiles` (container)
2. Changes flow both ways instantly — no cloning, no syncing, and the same dotfiles work on your host and in every container
3. Optionally, enable the commented `postCreateCommand` in `devcontainer.json` (`curl -fsSL https://devmagic.run/setup | bash`) to install extras (oh-my-zsh, fzf) and link `shell/init.sh` from your dotfiles into the container's `.bashrc`/`.zshrc`

**Don't keep dotfiles at `~/.config/dotfiles`?** Adjust (or remove) the mount in `.devcontainer/docker-compose.yml`. If the folder doesn't exist on the host, Docker just creates it empty — harmless.

Your dotfiles' `shell/init.sh` (if you use the setup script) should be idempotent (safe to source multiple times).

For full details, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) or [devmagic.run/docs](https://devmagic.run/docs).
