# 🚀 DevMagic Environment

> [!NOTE]
> _If you just want to use it, run_:
>
> ```sh
> curl -fsSL https://devmagic.run/install | bash
> ```
>
> _(P.S.: It is always recommended to [see what you are running](https://devmagic.run/install) before doing so.)_

## TL;DR

DevMagic can be used in **three different ways**:

1. **Add to Your Project (recommended)** — use the installer to add DevMagic to any existing project with one command.
2. **Standalone Environment** — use this repo directly as a portable dev environment (no need to install development tools on your host; just Podman/Docker + VS Code).
3. **Contribute to DevMagic** — work on `devmagic.run` itself (the website in the `www` folder), using its wrapper `.devcontainer`.

It also supports optional auxiliary services (see `docker-compose.yml` for available options).

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
curl -fsSL https://devmagic.run/install | bash
```

This will:

1. Create a `.devcontainer/` directory in your project
2. Download the DevMagic configuration files
3. Set up auxiliary services configuration (optional)

After running the installer:

1. Open your project in VS Code
2. Choose **"Reopen in Container"**
3. Your project now has a fully configured dev environment!

The dev container includes:

- Node.js with pnpm and yarn
- Git with Git LFS and GitHub CLI
- Docker-in-Docker for running containers
- Zsh with Oh My Zsh
- AI CLI tools (aider, GitHub Copilot CLI, Gemini CLI, Claude CLI)
- VS Code extensions for AI development (Cline, Continue.dev)

### Customizing Your Setup

After installation, you can customize `.devcontainer/devcontainer.json`:

- Add or remove [Dev Container Features](https://containers.dev/features)
- Adjust environment variables
- Configure VS Code extensions
- Set up credential mounts

See the [official features list](https://github.com/devcontainers/features) for available options.

## 💻 Standalone Usage (Portable Dev Environment) <a id="standalone"></a>

You can use this repository **directly as your dev environment**. This is useful if:

- You are on a fresh OS installation,
- You don't want to install development tools on your host,
- You just want a temporary throw‑away workspace to hack on code.

### Requirements

- A container runtime (e.g. [Podman Desktop](https://podman-desktop.io) or Docker)
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

The environment uses [Dev Container Features](https://containers.dev/features) for setup. To customize:

1. Edit `.devcontainer/devcontainer.json` and modify the `features` section
2. Add or remove features as needed (official features at [ghcr.io/devcontainers/features](https://github.com/devcontainers/features))
3. Rebuild the container for changes to take effect

The devcontainer includes:

- Node.js with pnpm and yarn
- Git with Git LFS and GitHub CLI
- Docker-in-Docker
- Zsh with Oh My Zsh
- AI CLI tools (aider, GitHub Copilot CLI, Gemini CLI, Claude CLI)
- VS Code extensions for AI development (Cline, Continue.dev)

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

This environment is designed to be modular. The main dev container starts by default, and you can bring up additional services on demand.

See `docker-compose.yml` for the full list of available services and their configuration. Below are some examples of how to use them.

This process starts **after** you have already opened your project in the dev container.

### Step 1: Open a Terminal in VS Code

Open a new terminal inside VS Code (`Terminal > New Terminal`). You will be running commands from within your main dev container.

### Step 2: Start an Auxiliary Service

Your `docker-compose.yml` file is in your workspace, and because you have Docker installed in your container, you can use the `docker compose` command.

Services are organized by profiles. Check `docker-compose.yml` to see available profiles. Examples:

```bash
# Start AI services (e.g., Ollama)
docker compose --profile ai up -d

# Start database services (e.g., PostgreSQL)
docker compose --profile postgres up -d
```

- `--profile <name>`: This flag tells Compose to only start services marked with that profile name.
- `up -d`: Creates and starts the container(s) in the background.

### Step 3: Verify the Service is Running

You now have multiple containers running side-by-side. You can verify this by running:

```bash
docker ps
```

You will see your main devcontainer and the new service container(s). They are on the same Docker network and can communicate with each other using their service names (e.g., `ollama`, `postgres`).

### Step 4: Connect to the Service

From inside your main dev container, you can access services using their service name as the hostname.

For connection details (hostnames, ports, credentials), refer to the service definitions in `docker-compose.yml`.

Examples:

- Services typically use their service name as hostname (e.g., `http://ollama:11434`, `postgres:5432`)
- Default credentials and database names are defined in the compose file
- Port mappings allow access from your host machine as well

### Step 5: Stopping a Service

When you are finished, you can stop service(s) without affecting your main dev container.

```bash
# Stop services by profile
docker compose --profile <profile-name> down

# Examples:
docker compose --profile ai down
docker compose --profile postgres down
```

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

DevMagic integrates with your personal dotfiles repository, keeping container infrastructure separate from personal preferences. When the container starts, it automatically runs `~/prj/dotfiles/shell/install.sh` if it exists.

**Quick setup:**

1. Configure VS Code: `"dotfiles.repository": "yourusername/dotfiles"`
2. Create `shell/install.sh` in your dotfiles for personal tools (Homebrew, fzf, VS Code settings, etc.)

For full details, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) or [devmagic.run/docs](https://devmagic.run/docs).
