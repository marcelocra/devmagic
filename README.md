# 🚀 DevMagic Environment

> [!NOTE]\
> _If you just want to use it, run_:
>
> ```sh
> curl -fsSL https://devmagic.run/install | bash
> ```
>
> _(P.S.: It is always recommended to [see what you are running](https://devmagic.run/install) before doing so.)_

## TL;DR

DevMagic can be used in **three different ways**:

1. **Standalone (recommended for most users)** — use this repo directly as a portable dev environment (no need to install development tools on your host; just Podman/Docker + VS Code).
2. **Consumer** — embed it as a `.devcontainer` submodule inside your own projects.
3. **Maintainer** — work on `devmagic.run` itself (the website in the `www` folder), using its wrapper `.devcontainer`.

It also supports optional auxiliary services (see `docker-compose.yml` for available options).

## Table of Contents

- [Standalone Usage](#standalone)
  - Requirements
  - Getting Started
  - Temporary Workspace Workflow
- [Consumer Usage](#consumer)
- [Auxiliary Services](#aux)
  - Step 1: Open a Terminal in VS Code
  - Step 2: Start an Auxiliary Service
  - Step 3: Verify the Service is Running
  - Step 4: Connect to the Service
  - Step 5: Stopping a Service
- [Maintainer Usage](#maintainer)

## Overview

This repository contains the core configuration for the DevMagic development environment.
You can use it as a **standalone workspace**, as a **submodule in other projects**, or to
**develop DevMagic itself** (including the website hosted at devmagic.run).

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

## 📦 Consumer Usage (for other repositories) <a id="consumer"></a>

This repository is also designed to be used as a **submodule** inside your projects, specifically mounted at `.devcontainer/`:

```bash
git submodule add https://github.com/marcelocra/devmagic.git .devcontainer
```

After adding, your project will have:

```
your-project/
└── .devcontainer/        ← submodule
    ├── devcontainer.json
    ├── docker-compose.yml
    └── ...
```

From here, open the project in VS Code and "Reopen in Container."

> [!NOTE]
> Once it is possible to [extend a devcontainer](https://github.com/devcontainers/spec/issues/22), this step won't be necessary anymore and we'll be able to simply:
>
> ```json
> {
>   "name": "My Project",
>   "extends": ".devcontainer/devcontainer.json"
> }
> ```
>
> But don't hold your breath... the issue is from 2022.

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

## 🛠️ Maintainer Usage (developing this repo itself) <a id="maintainer"></a>

If you want to **develop this repository itself** (including the devmagic.run website in the `www` folder) inside a Dev Container:

1. Clone this repository:

   ```bash
   git clone https://github.com/marcelocra/devmagic.git
   cd devmagic
   ```

2. A `.devcontainer/devcontainer.json` wrapper file is included at the root level.  
   VS Code will detect it and allow you to **"Reopen in Container"**.

3. This setup ensures:
   - **Consumers** see the expected `.devcontainer/` contents when using this repo as a submodule.
   - **Maintainers** can work on DevMagic itself (including the website) in a self‑hosted Dev Container without extra steps.
