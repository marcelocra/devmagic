# containerEnv vs remoteEnv: A Dev Container Gotcha

**Date:** 2025-11-26

**TL;DR:** Use `containerEnv` for environment variables needed during container setup (`postCreateCommand`). `remoteEnv` only works after VS Code connects, which is too late for lifecycle scripts.

## The Problem

I was implementing automatic dotfiles cloning for DevMagic. The plan was simple:

1. User sets `DEVMAGIC_DOTFILES_REPO` environment variable
2. `postCreateCommand` script clones the repo
3. Done!

My first attempt used `remoteEnv`:

```json
{
  "remoteEnv": {
    "DEVMAGIC_DOTFILES_REPO": "https://github.com/user/dotfiles.git"
  },
  "postCreateCommand": "curl -fsSL https://devmagic.run/setup | bash"
}
```

**It didn't work.** The environment variable was always empty during `postCreateCommand`.

## The Root Cause

After digging into the [Dev Container specification](https://containers.dev/implementors/json_reference/), I found the answer:

| Property | When Available | Use Case |
|----------|----------------|----------|
| `containerEnv` | Container creation time | Lifecycle scripts, all processes |
| `remoteEnv` | After VS Code connects | Editor/terminal sessions only |

The lifecycle is:

```
1. Container created
2. postCreateCommand runs        ← containerEnv available, remoteEnv NOT available
3. VS Code connects
4. remoteEnv applied             ← Now remoteEnv is available
5. Terminal/editor sessions
```

`remoteEnv` is designed for variables that need to be dynamic (can change without rebuild) or for VS Code-specific configuration. It's **explicitly not available** during lifecycle scripts.

## The Solution

Switch to `containerEnv`:

```json
{
  "containerEnv": {
    "DEVMAGIC_DOTFILES_REPO": "${localEnv:DEVMAGIC_DOTFILES_REPO:https://github.com/marcelocra/dotfiles.git}"
  },
  "postCreateCommand": "curl -fsSL https://devmagic.run/setup | bash"
}
```

Now the setup script can read `$DEVMAGIC_DOTFILES_REPO` during `postCreateCommand`.

## Bonus: The `${localEnv:VAR}` Pattern

Notice the `${localEnv:VAR}` syntax. This is powerful:

1. **Reads from host environment** - Users set the variable once in their `~/.bashrc`
2. **No file edits needed** - Users customize via environment, not by editing devcontainer.json

```bash
# User's ~/.bashrc
export DEVMAGIC_DOTFILES_REPO="https://github.com/myuser/dotfiles.git"
```

The variable flows: Host shell → `localEnv` → `containerEnv` → Container processes.

> **Note:** The `${localEnv:VAR:default}` syntax exists but [doesn't work with colons in the default value](https://github.com/devcontainers/spec/issues/565) (like URLs). Handle defaults in your scripts instead.

## When to Use Each

### Use `containerEnv` when:
- Variables needed during `postCreateCommand`, `onCreateCommand`, etc.
- Variables should be available to all container processes
- You want static configuration (requires rebuild to change)

### Use `remoteEnv` when:
- Variables only needed in VS Code terminals/tasks
- Variables should be dynamic (changeable without rebuild)
- Referencing other container variables: `"PATH": "${containerEnv:PATH}:/extra"`

## Key Takeaways

1. **Lifecycle scripts run before VS Code connects** - `remoteEnv` won't help
2. **`containerEnv` is the safe default** - Works everywhere
3. **`${localEnv:VAR}` for host variables** - Zero-config customization
4. **Handle defaults in scripts** - The `:default` syntax [breaks with colons](https://github.com/devcontainers/spec/issues/565)
5. **Read the spec** - The [devcontainer.json reference](https://containers.dev/implementors/json_reference/) explains this clearly (once you know to look)

## Related

- [ADR 0002: Automatic Dotfiles Installation](adr/0002-automatic-dotfiles-installation.md)
- [Dev Container Specification](https://containers.dev/implementors/json_reference/)
- [DevMagic Architecture](ARCHITECTURE.md)
