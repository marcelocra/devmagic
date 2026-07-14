# Dev image for the DevMagic dev container. Built by Docker Compose (see the
# `build:` block in docker-compose.yml).
#
# Pinned tag for reproducibility (same as `24-bookworm` at the time of
# writing). Browse available tags at:
# https://mcr.microsoft.com/en-us/artifact/mar/devcontainers/typescript-node/tags
FROM mcr.microsoft.com/devcontainers/typescript-node:5.0.1-24

USER root

# Build-time defaults only: at runtime these are overridden by the
# `containerEnv` block in devcontainer.json, which forwards your host values
# via ${localEnv:*}.
ARG TZ=America/Sao_Paulo
ARG LC_ALL=C.UTF-8
ARG LANG=C.UTF-8
ENV TZ=${TZ} LC_ALL=${LC_ALL} LANG=${LANG}

RUN apt-get update \
    && apt-get install -y --no-install-recommends tmux neovim ripgrep fd-find \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# The username comes from the base image (typescript-node ships `node`) and is
# kept consistent with devcontainer.json and docker-compose.yml by the
# generator. If you change the base image, make sure this user exists in it.
RUN chsh -s /usr/bin/zsh {{USER}}
USER {{USER}}
