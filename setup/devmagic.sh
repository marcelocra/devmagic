#!/bin/bash
# TODO(agent): rename this file to devcontainer.bash and use bashisms
# throughout. Not done yet to avoid mixing a file rename with content changes
# in the same PR, which would make history harder to track.
#
# DevMagic - Development environment setup
# Usage:
#   Latest version: curl -fsSL https://devmagic.run/install | bash
#   Specific version: curl -fsSL https://devmagic.run/install@v0.2.1 | bash
#
# Downloads the DevMagic dev container templates (devcontainer.json,
# docker-compose.yml, Dockerfile), fills in your project name, and writes the
# result into a `.devcontainer/` folder in the current directory. No
# placeholders or env files are left behind — the generated files are ready
# to use and every value that must match across them is baked in consistently.

set -e

# --- Configuration ---
VERSION="${1:-main}"  # Default to 'main' branch if no version specified
REPO="marcelocra/devmagic"
BASE_URL="https://raw.githubusercontent.com/${REPO}/${VERSION}"

# --- Colors for output ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# --- Header ---
echo -e "${PURPLE}"
echo "🚀 DevMagic"
echo "━━━━━━━━━━━━━━━━━━━"
echo "Development environment setup"
echo -e "Version: ${VERSION}${NC}"
echo

# --- Prerequisite Checks ---
# Check for curl
if ! command -v curl &> /dev/null; then
    echo -e "${RED}❌ curl is not installed. Please install curl to continue.${NC}"
    exit 1
fi

# Check if inside a Git repository (optional, but recommended)
IS_GIT_REPO=$(git rev-parse --is-inside-work-tree 2>/dev/null || echo "false")
if [ "$IS_GIT_REPO" != "true" ]; then
    echo -e "${YELLOW}ℹ️  This directory is not a Git repository.${NC}"
    echo -e "${YELLOW}   DevMagic works best in a Git repository.${NC}"
    echo
fi

# Check for existing .devcontainer directory
if [ -d ".devcontainer" ]; then
    echo -e "${YELLOW}⚠️ A '.devcontainer' directory already exists.${NC}"
    read -p "Do you want to overwrite it? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}Aborting. Please remove or rename the existing .devcontainer directory.${NC}"
        exit 1
    fi
    rm -rf .devcontainer
fi

# --- Project Name ---
# The folder name is baked into the generated files (workspace mount path,
# Compose project name, hostname, image tag). Compose project names only
# allow lowercase letters, digits, dashes and underscores.
FOLDER_NAME=$(basename "$PWD")
PROJECT_NAME=$(echo "$FOLDER_NAME" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9_-]+/-/g; s/^[-_]+//')
if [ -z "$PROJECT_NAME" ]; then
    PROJECT_NAME="devmagic"
fi
if [ "$PROJECT_NAME" != "$FOLDER_NAME" ]; then
    echo -e "${YELLOW}ℹ️  Folder name '${FOLDER_NAME}' isn't a valid Compose project name;${NC}"
    echo -e "${YELLOW}   using '${PROJECT_NAME}' instead (both files stay consistent).${NC}"
    echo
fi

# Container username, filled into every generated file for consistency. Must
# exist in the base image used by the Dockerfile (typescript-node ships `node`).
CONTAINER_USER="node"

# --- Download Templates and Generate Files ---
echo -e "${BLUE}⚙️ Generating DevMagic environment for '${PROJECT_NAME}'...${NC}"

mkdir -p .devcontainer

FILES=(
    "devcontainer.json"
    "docker-compose.yml"
    "Dockerfile"
)

FAILED=0
for FILE in "${FILES[@]}"; do
    URL="${BASE_URL}/templates/devcontainer/${FILE}"

    echo -e "${BLUE}  📥 ${FILE}...${NC}"

    if TEMPLATE=$(curl -fsSL "$URL"); then
        # Fill the placeholders and write the ready-to-use file.
        printf '%s\n' "$TEMPLATE" \
            | sed -e "s/{{PROJECT_NAME}}/${PROJECT_NAME}/g" -e "s/{{USER}}/${CONTAINER_USER}/g" \
            > ".devcontainer/${FILE}"
        echo -e "${GREEN}     ✓ .devcontainer/${FILE}${NC}"
    else
        echo -e "${RED}     ✗ Failed to download ${FILE}${NC}"
        FAILED=1
    fi
done

if [ $FAILED -eq 1 ]; then
    echo
    echo -e "${RED}❌ Some files failed to download.${NC}"
    echo -e "${YELLOW}   This might be because the version '${VERSION}' doesn't exist.${NC}"
    echo -e "${YELLOW}   Try without specifying a version to get the latest.${NC}"
    exit 1
fi

echo
echo -e "${GREEN}✅ DevMagic environment generated successfully!${NC}"
echo

# --- Next Steps ---
echo -e "${PURPLE}🚀 Your DevMagic environment is ready!${NC}"
echo
echo -e "${YELLOW}Next steps:${NC}"

echo "• Review the generated files:"
echo -e "  ${GREEN}ls -la .devcontainer/${NC}"
echo

if [ "$IS_GIT_REPO" = "true" ]; then
    echo "• (Optional) Commit the files to your repository:"
    echo -e "  ${GREEN}git add .devcontainer${NC}"
    echo -e "  ${GREEN}git commit -m \"feat: add DevMagic development environment\"${NC}"
    echo
fi

echo "• Open this project in VS Code with the Dev Containers extension."
echo "  It will automatically prompt you to reopen in the container."

echo
echo -e "${BLUE}💡 To update to a different version, rerun this script:${NC}"
echo -e "   ${GREEN}curl -fsSL https://devmagic.run/install@v0.2.1 | bash${NC}"
echo
echo -e "${BLUE}📚 Learn more: https://devmagic.run${NC}"
echo
