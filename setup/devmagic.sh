#!/bin/bash
# DevMagic - Development environment setup
# Usage:
#   Latest version: curl -fsSL https://devmagic.run/install | bash
#   Specific version: curl -fsSL https://devmagic.run/install@v0.2.1 | bash
#
# Downloads the full DevMagic dev container setup (devcontainer.json,
# docker-compose.yml, Dockerfile, .env) into a `.devcontainer/` folder in the
# current directory.

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

# --- Download Files ---
echo -e "${BLUE}⚙️ Downloading DevMagic environment files...${NC}"

# Create directory structure
mkdir -p .devcontainer

# Files to download into .devcontainer/ (paths are the same in the repo).
FILES=(
    ".devcontainer/devcontainer.json"
    ".devcontainer/docker-compose.yml"
    ".devcontainer/Dockerfile"
    ".devcontainer/.env.example"
)

# Download each file
FAILED=0
for FILE_PATH in "${FILES[@]}"; do
    URL="${BASE_URL}/${FILE_PATH}"

    echo -e "${BLUE}  📥 Downloading ${FILE_PATH}...${NC}"

    if curl -fsSL "$URL" -o "$FILE_PATH"; then
        echo -e "${GREEN}     ✓ ${FILE_PATH}${NC}"
    else
        echo -e "${RED}     ✗ Failed to download ${FILE_PATH}${NC}"
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

# --- Generate .env ---
# COMPOSE_PROJECT_NAME must match the project folder name (devcontainer.json
# mounts the workspace at /workspaces/<folder name>). Compose project names
# only allow lowercase letters, digits, dashes and underscores.
FOLDER_NAME=$(basename "$PWD")
PROJECT_NAME=$(echo "$FOLDER_NAME" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9_-]+/-/g; s/^[-_]+//')
if [ -z "$PROJECT_NAME" ]; then
    PROJECT_NAME="devmagic"
fi

cat > .devcontainer/.env <<EOF
# Must match the project folder name. See .env.example for details.
COMPOSE_PROJECT_NAME=${PROJECT_NAME}
EOF
echo -e "${GREEN}     ✓ .devcontainer/.env (COMPOSE_PROJECT_NAME=${PROJECT_NAME})${NC}"

if [ "$PROJECT_NAME" != "$FOLDER_NAME" ]; then
    echo
    echo -e "${YELLOW}⚠️  Your folder name '${FOLDER_NAME}' isn't a valid Compose project name,${NC}"
    echo -e "${YELLOW}   so '${PROJECT_NAME}' was used instead. Set \"workspaceFolder\" in${NC}"
    echo -e "${YELLOW}   .devcontainer/devcontainer.json to \"/workspaces/${PROJECT_NAME}\" to match.${NC}"
fi

echo
echo -e "${GREEN}✅ DevMagic environment files downloaded successfully!${NC}"
echo

# --- Next Steps ---
echo -e "${PURPLE}🚀 Your DevMagic environment is ready!${NC}"
echo
echo -e "${YELLOW}Next steps:${NC}"

echo "• Review the downloaded files:"
echo -e "  ${GREEN}ls -la .devcontainer/${NC}"
echo

if [ "$IS_GIT_REPO" = "true" ]; then
    echo "• (Optional) Commit the files to your repository:"
    echo -e "  ${GREEN}git add -f .devcontainer${NC}"
    echo -e "  ${GREEN}git commit -m \"feat: add DevMagic development environment\"${NC}"
    echo "  (-f ensures .devcontainer/.env is added even if your .gitignore excludes .env files;"
    echo "   it only contains the Compose project name, no secrets)"
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
