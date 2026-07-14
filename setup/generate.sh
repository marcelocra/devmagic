#!/bin/bash
# Fill the devcontainer templates with a project name, locally.
#
# The DevMagic installer (setup/devmagic.sh) does the same thing over the
# network; this script is for working from a checkout — most importantly, to
# regenerate this repo's own .devcontainer/ after editing the templates:
#
#   ./setup/generate.sh                 # fills for "devmagic" into .devcontainer/
#   ./setup/generate.sh my-app ./out    # custom name and destination

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATES_DIR="${REPO_ROOT}/templates/devcontainer"

PROJECT_NAME="${1:-devmagic}"
DEST="${2:-${REPO_ROOT}/.devcontainer}"

# Container username. Must exist in the base image used by the Dockerfile
# (typescript-node ships `node`). Filled everywhere for consistency.
REMOTE_USER="${DEVMAGIC_REMOTE_USER:-node}"

# Compose project names only allow lowercase letters, digits, dashes and
# underscores.
SANITIZED=$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9_-]+/-/g; s/^[-_]+//')
if [ -z "$SANITIZED" ]; then
    echo "error: '$PROJECT_NAME' sanitizes to an empty project name" >&2
    exit 1
fi
if [ "$SANITIZED" != "$PROJECT_NAME" ]; then
    echo "note: using '$SANITIZED' (sanitized from '$PROJECT_NAME')"
fi

mkdir -p "$DEST"
for FILE in devcontainer.json docker-compose.yml Dockerfile; do
    sed -e "s/{{PROJECT_NAME}}/${SANITIZED}/g" -e "s/{{REMOTE_USER}}/${REMOTE_USER}/g" \
        "${TEMPLATES_DIR}/${FILE}" > "${DEST}/${FILE}"
    echo "  ✓ ${DEST}/${FILE}"
done

echo "Done. Generated for project '${SANITIZED}'."
