#!/bin/bash
# DevMagic v0.1.0 - Development environment setup
# Usage:
#   Latest version: curl -fsSL https://devmagic.run/install | bash
#   Specific version: curl -fsSL https://devmagic.run/install@v0.1.0 | bash

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
echo "🚀 DevMagic v0.1.0"
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

# List of files to download
declare -A FILES=(
    [".devcontainer/devcontainer.json"]=".devcontainer/devcontainer.json"
    [".devcontainer/docker-compose.yml"]=".devcontainer/docker-compose.yml"
    [".devcontainer/Dockerfile"]=".devcontainer/Dockerfile"
    [".devcontainer/README.md"]=".devcontainer/README.md"
)

# Download each file
FAILED=0
for REMOTE_PATH in "${!FILES[@]}"; do
    LOCAL_PATH="${FILES[$REMOTE_PATH]}"
    URL="${BASE_URL}/${REMOTE_PATH}"

    echo -e "${BLUE}  📥 Downloading ${REMOTE_PATH}...${NC}"

    if curl -fsSL "$URL" -o "$LOCAL_PATH"; then
        echo -e "${GREEN}     ✓ ${LOCAL_PATH}${NC}"
    else
        echo -e "${RED}     ✗ Failed to download ${REMOTE_PATH}${NC}"
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
echo -e "${GREEN}✅ DevMagic environment files downloaded successfully!${NC}"
echo

# --- Next Steps ---
echo -e "${PURPLE}🚀 Your DevMagic environment is ready!${NC}"
echo
echo -e "${YELLOW}Next steps:${NC}"

if [ "$IS_GIT_REPO" = "true" ]; then
    echo "1. Review the downloaded files:"
    echo -e "   ${GREEN}ls -la .devcontainer/${NC}"
    echo
    echo "2. (Optional) Commit the files to your repository:"
    echo -e "   ${GREEN}git add .devcontainer${NC}"
    echo -e "   ${GREEN}git commit -m \"feat: add DevMagic development environment\"${NC}"
    echo
    echo "3. Open this project in VS Code with the Dev Containers extension."
    echo "   It will automatically prompt you to reopen in the container."
else
    echo "1. Review the downloaded files:"
    echo -e "   ${GREEN}ls -la .devcontainer/${NC}"
    echo
    echo "2. Open this project in VS Code with the Dev Containers extension."
    echo "   It will automatically prompt you to reopen in the container."
fi

echo
echo -e "${BLUE}💡 To update to a different version, rerun this script:${NC}"
echo -e "   ${GREEN}curl -fsSL https://devmagic.run/install@v0.1.0 | bash${NC}"
echo
echo -e "${BLUE}📚 Learn more: https://devmagic.run${NC}"
echo
