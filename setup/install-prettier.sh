#!/usr/bin/env bash
# DevMagic - Prettier Installation Script
# Installs and configures Prettier, Husky, and lint-staged
# Usage:
#   Latest version: curl -fsSL https://devmagic.run/install/prettier | bash
#   With npm: curl -fsSL https://devmagic.run/install/prettier?pm=npm | bash

set -e

# --- Configuration ---
PACKAGE_MANAGER="${PACKAGE_MANAGER:-pnpm}"  # Default to pnpm

# --- Colors for output ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# --- Header ---
echo -e "${PURPLE}"
echo "✨ Prettier Installation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Setting up automatic code formatting"
echo -e "Package Manager: ${PACKAGE_MANAGER}${NC}"
echo

# --- Prerequisite Checks ---

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ package.json not found. This script must be run in a Node.js project.${NC}"
    exit 1
fi

# Check if Git repository exists
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
    echo -e "${RED}❌ Not a Git repository. Husky requires Git to function.${NC}"
    exit 1
fi

# Verify package manager is installed
if ! command -v "$PACKAGE_MANAGER" &> /dev/null; then
    echo -e "${RED}❌ ${PACKAGE_MANAGER} is not installed. Please install it first.${NC}"
    exit 1
fi

# Validate package manager
case "$PACKAGE_MANAGER" in
    pnpm|npm|yarn|bun)
        ;;
    *)
        echo -e "${RED}❌ Unsupported package manager: ${PACKAGE_MANAGER}${NC}"
        echo -e "${YELLOW}   Supported: pnpm, npm, yarn, bun${NC}"
        exit 1
        ;;
esac

echo -e "${BLUE}✓ Prerequisites check passed${NC}"
echo

# --- Helper Functions ---

# Detect if we're in a workspace (monorepo)
is_workspace() {
    if [ "$PACKAGE_MANAGER" = "pnpm" ]; then
        # Check for pnpm-workspace.yaml
        [ -f "pnpm-workspace.yaml" ]
    elif [ "$PACKAGE_MANAGER" = "npm" ]; then
        # Check for workspaces in package.json
        grep -q '"workspaces"' package.json 2>/dev/null
    elif [ "$PACKAGE_MANAGER" = "yarn" ]; then
        # Check for workspaces in package.json
        grep -q '"workspaces"' package.json 2>/dev/null
    else
        # bun doesn't have strong workspace support yet
        false
    fi
}

# Get the appropriate install command
get_install_cmd() {
    local packages="$1"
    local dev_flag="$2"
    
    case "$PACKAGE_MANAGER" in
        pnpm)
            if is_workspace; then
                echo "pnpm add -w ${dev_flag} ${packages}"
            else
                echo "pnpm add ${dev_flag} ${packages}"
            fi
            ;;
        npm)
            echo "npm install ${dev_flag} ${packages}"
            ;;
        yarn)
            echo "yarn add ${dev_flag} ${packages}"
            ;;
        bun)
            echo "bun add ${dev_flag} ${packages}"
            ;;
    esac
}

# Get the appropriate dev flag
get_dev_flag() {
    case "$PACKAGE_MANAGER" in
        pnpm|npm)
            echo "--save-dev"
            ;;
        yarn|bun)
            echo "-D"
            ;;
    esac
}

# Get the appropriate exact flag for prettier
get_exact_flag() {
    case "$PACKAGE_MANAGER" in
        pnpm|npm)
            echo "--save-exact"
            ;;
        yarn)
            echo "--exact"
            ;;
        bun)
            echo ""  # bun doesn't have an exact flag, uses exact by default
            ;;
    esac
}

# Get the exec command
get_exec_cmd() {
    local cmd="$1"
    
    case "$PACKAGE_MANAGER" in
        pnpm|npm|yarn)
            echo "${PACKAGE_MANAGER} exec ${cmd}"
            ;;
        bun)
            echo "bunx ${cmd}"
            ;;
    esac
}

# --- Step 1: Install Prettier ---
echo -e "${BLUE}📦 Step 1/7: Installing Prettier...${NC}"

DEV_FLAG=$(get_dev_flag)
EXACT_FLAG=$(get_exact_flag)
INSTALL_CMD=$(get_install_cmd "prettier" "${DEV_FLAG} ${EXACT_FLAG}")

echo -e "${YELLOW}Running: ${INSTALL_CMD}${NC}"
eval "$INSTALL_CMD"

echo -e "${GREEN}✓ Prettier installed${NC}"
echo

# --- Step 2: Create .prettierrc ---
echo -e "${BLUE}📝 Step 2/7: Creating .prettierrc...${NC}"

if [ -f ".prettierrc" ]; then
    echo -e "${YELLOW}⚠️  .prettierrc already exists, skipping...${NC}"
else
    cat > .prettierrc << 'EOF'
{}
EOF
    echo -e "${GREEN}✓ .prettierrc created${NC}"
fi
echo

# --- Step 3: Create .prettierignore ---
echo -e "${BLUE}📝 Step 3/7: Creating .prettierignore...${NC}"

if [ -f ".prettierignore" ]; then
    echo -e "${YELLOW}⚠️  .prettierignore already exists, skipping...${NC}"
else
    cat > .prettierignore << 'EOF'
# Ignore artifacts:
build
coverage
dist
.next
out
node_modules
pnpm-lock.yaml
yarn.lock
package-lock.json
bun.lockb
EOF
    echo -e "${GREEN}✓ .prettierignore created${NC}"
fi
echo

# --- Step 4: Create .editorconfig ---
echo -e "${BLUE}📝 Step 4/7: Creating .editorconfig...${NC}"

if [ -f ".editorconfig" ]; then
    echo -e "${YELLOW}⚠️  .editorconfig already exists, skipping...${NC}"
else
    cat > .editorconfig << 'EOF'
root = true

[*]
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
end_of_line = lf
charset = utf-8
spelling_languages = en-US,en,pt-BR,pt
max_line_length = 120

[*.{lua,toml,yaml,yml,json,jsonc,json5}]
max_line_length = 80

[*.{fs,fsi,fsx}]
indent_size = 4
# Simplifies reordering and adding new items. Details:
# https://learn.microsoft.com/en-us/dotnet/fsharp/style-guide/formatting#multiline-bracket-formatting-style
fsharp_multiline_bracket_style = stroustrup

[*.{py,sh,zsh,bash,gitconfig,tmux.conf}]
indent_size = 4
max_line_length = 80

[*.{md,markdown,mdx}]
indent_size = 4
max_line_length = unset           # Not wrapping lines reduces diffs.
trim_trailing_whitespace = false  # Double trailing spaces can be used to break lines.
EOF
    echo -e "${GREEN}✓ .editorconfig created${NC}"
fi
echo

# --- Step 5: Install Husky and lint-staged ---
echo -e "${BLUE}📦 Step 5/7: Installing Husky and lint-staged...${NC}"

INSTALL_CMD=$(get_install_cmd "husky lint-staged" "${DEV_FLAG}")

echo -e "${YELLOW}Running: ${INSTALL_CMD}${NC}"
eval "$INSTALL_CMD"

echo -e "${GREEN}✓ Husky and lint-staged installed${NC}"
echo

# --- Step 6: Initialize Husky and configure pre-commit hook ---
echo -e "${BLUE}🪝 Step 6/7: Configuring Husky...${NC}"

HUSKY_INIT=$(get_exec_cmd "husky init")
echo -e "${YELLOW}Running: ${HUSKY_INIT}${NC}"
eval "$HUSKY_INIT"

# Create pre-commit hook
PRE_COMMIT_CMD=$(get_exec_cmd "lint-staged")
cat > .husky/pre-commit << EOF
${PRE_COMMIT_CMD}
EOF

chmod +x .husky/pre-commit

echo -e "${GREEN}✓ Husky configured${NC}"
echo

# --- Step 7: Add lint-staged configuration to package.json ---
echo -e "${BLUE}⚙️  Step 7/7: Configuring lint-staged...${NC}"

# Check if lint-staged config already exists (look for the config object, not just dependency name)
if grep -q '"lint-staged"[[:space:]]*:[[:space:]]*{' package.json; then
    echo -e "${YELLOW}⚠️  lint-staged configuration already exists in package.json, skipping...${NC}"
else
    # Use node to add lint-staged config to package.json
    node --eval "
    const fs = require('fs');
    const pkgPath = 'package.json';
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg['lint-staged'] = {
      '**/*': 'prettier --write --ignore-unknown'
    };
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    "
    echo -e "${GREEN}✓ lint-staged configured in package.json${NC}"
fi
echo

# --- Step 8: Create GitHub Actions workflow (optional) ---
echo -e "${BLUE}🔄 Creating GitHub Actions workflow...${NC}"

WORKFLOW_DIR=".github/workflows"
WORKFLOW_FILE="${WORKFLOW_DIR}/format-check.yml"

if [ -f "$WORKFLOW_FILE" ]; then
    echo -e "${YELLOW}⚠️  GitHub Actions workflow already exists, skipping...${NC}"
else
    mkdir -p "$WORKFLOW_DIR"
    
    # Determine the install command for CI
    case "$PACKAGE_MANAGER" in
        pnpm)
            SETUP_STEP='      - uses: pnpm/action-setup@v4
        with:
          version: 9'
            INSTALL_CMD_CI='pnpm install --frozen-lockfile'
            CHECK_CMD='pnpm exec prettier --check .'
            ;;
        npm)
            SETUP_STEP=''
            INSTALL_CMD_CI='npm ci'
            CHECK_CMD='npm exec prettier -- --check .'
            ;;
        yarn)
            SETUP_STEP=''
            INSTALL_CMD_CI='yarn install --frozen-lockfile'
            CHECK_CMD='yarn exec prettier --check .'
            ;;
        bun)
            SETUP_STEP='      - uses: oven-sh/setup-bun@v2'
            INSTALL_CMD_CI='bun install --frozen-lockfile'
            CHECK_CMD='bunx prettier --check .'
            ;;
    esac
    
    cat > "$WORKFLOW_FILE" << EOF
name: Format Check
on: [push, pull_request]

jobs:
  check-format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
${SETUP_STEP}
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "${PACKAGE_MANAGER}"
      - run: ${INSTALL_CMD_CI}
      - run: ${CHECK_CMD}
EOF
    echo -e "${GREEN}✓ GitHub Actions workflow created at ${WORKFLOW_FILE}${NC}"
fi
echo

# --- Success ---
echo -e "${GREEN}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Prettier setup complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${NC}"
echo "What was configured:"
echo "  ✓ Prettier installed with exact version pinning"
echo "  ✓ .prettierrc configuration file"
echo "  ✓ .prettierignore for excluding files"
echo "  ✓ .editorconfig for editor consistency"
echo "  ✓ Husky for Git hooks"
echo "  ✓ lint-staged for pre-commit formatting"
echo "  ✓ GitHub Actions workflow for CI checks"
echo
echo "Next steps:"
echo "  1. Customize .prettierrc with your preferences (optional)"
echo "  2. Run '$(get_exec_cmd "prettier --write .")' to format all files"
echo "  3. Commit your changes - formatting will run automatically!"
echo
echo -e "${YELLOW}Note: Your commits will now be automatically formatted.${NC}"
echo
