#!/usr/bin/env bash
# DevMagic - Prettier Installation Script
# Installs and configures Prettier, Husky, and lint-staged
# Usage:
#   Latest version: curl -fsSL https://devmagic.run/install/prettier | bash
#   With npm: curl -fsSL https://devmagic.run/install/prettier?pm=npm | bash

set -euo pipefail

# --- Configuration ---
PACKAGE_MANAGER="${PACKAGE_MANAGER:-pnpm}"

# --- Colors for output ---
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly PURPLE='\033[0;35m'
readonly NC='\033[0m'

# --- Helper Functions ---

show_header() {
    echo -e "${PURPLE}"
    echo "✨ Prettier Installation"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Setting up automatic code formatting"
    echo -e "Package Manager: ${PACKAGE_MANAGER}${NC}"
    echo
}

check_prerequisites() {
    echo -e "${BLUE}Checking prerequisites...${NC}"
    
    # Check if package.json exists
    if [[ ! -f "package.json" ]]; then
        echo -e "${RED}❌ package.json not found. This script must be run in a Node.js project.${NC}"
        exit 1
    fi
    
    # Check if Git repository exists
    if ! git rev-parse --is-inside-work-tree &>/dev/null; then
        echo -e "${RED}❌ Not a Git repository. Husky requires Git to function.${NC}"
        exit 1
    fi
    
    # Verify package manager is installed
    if ! command -v "$PACKAGE_MANAGER" &>/dev/null; then
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
    
    echo -e "${GREEN}✓ Prerequisites check passed${NC}"
    echo
}

is_workspace() {
    if [[ "$PACKAGE_MANAGER" == "pnpm" ]]; then
        [[ -f "pnpm-workspace.yaml" ]]
    elif [[ "$PACKAGE_MANAGER" == "npm" || "$PACKAGE_MANAGER" == "yarn" ]]; then
        grep -q '"workspaces"' package.json 2>/dev/null
    else
        return 1
    fi
}

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

get_exact_flag() {
    case "$PACKAGE_MANAGER" in
        pnpm|npm)
            echo "--save-exact"
            ;;
        yarn)
            echo "--exact"
            ;;
        bun)
            echo ""
            ;;
    esac
}

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

install_prettier() {
    echo -e "${BLUE}📦 Step 1/7: Installing Prettier...${NC}"
    
    local dev_flag
    dev_flag=$(get_dev_flag)
    local exact_flag
    exact_flag=$(get_exact_flag)
    local install_cmd
    install_cmd=$(get_install_cmd "prettier" "${dev_flag} ${exact_flag}")
    
    echo -e "${YELLOW}Running: ${install_cmd}${NC}"
    eval "$install_cmd"
    
    echo -e "${GREEN}✓ Prettier installed${NC}"
    echo
}

create_prettierrc() {
    echo -e "${BLUE}📝 Step 2/7: Creating .prettierrc...${NC}"
    
    if [[ -f ".prettierrc" ]]; then
        echo -e "${YELLOW}⚠️  .prettierrc already exists, skipping...${NC}"
    else
        cat > .prettierrc << 'EOF'
{}
EOF
        echo -e "${GREEN}✓ .prettierrc created${NC}"
    fi
    echo
}

create_prettierignore() {
    echo -e "${BLUE}📝 Step 3/7: Creating .prettierignore...${NC}"
    
    if [[ -f ".prettierignore" ]]; then
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
}

create_editorconfig() {
    echo -e "${BLUE}📝 Step 4/7: Creating .editorconfig...${NC}"
    
    if [[ -f ".editorconfig" ]]; then
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
}

install_husky_lintstaged() {
    echo -e "${BLUE}📦 Step 5/7: Installing Husky and lint-staged...${NC}"
    
    local dev_flag
    dev_flag=$(get_dev_flag)
    local install_cmd
    install_cmd=$(get_install_cmd "husky lint-staged" "${dev_flag}")
    
    echo -e "${YELLOW}Running: ${install_cmd}${NC}"
    eval "$install_cmd"
    
    echo -e "${GREEN}✓ Husky and lint-staged installed${NC}"
    echo
}

configure_husky() {
    echo -e "${BLUE}🪝 Step 6/7: Configuring Husky...${NC}"
    
    local husky_init
    husky_init=$(get_exec_cmd "husky init")
    echo -e "${YELLOW}Running: ${husky_init}${NC}"
    eval "$husky_init"
    
    # Create pre-commit hook
    local pre_commit_cmd
    pre_commit_cmd=$(get_exec_cmd "lint-staged")
    cat > .husky/pre-commit << EOF
${pre_commit_cmd}
EOF
    
    chmod +x .husky/pre-commit
    
    echo -e "${GREEN}✓ Husky configured${NC}"
    echo
}

configure_lintstaged() {
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
}

create_github_workflow() {
    echo -e "${BLUE}🔄 Creating GitHub Actions workflow...${NC}"
    
    local workflow_dir=".github/workflows"
    local workflow_file="${workflow_dir}/format-check.yml"
    
    if [[ -f "$workflow_file" ]]; then
        echo -e "${YELLOW}⚠️  GitHub Actions workflow already exists, skipping...${NC}"
    else
        mkdir -p "$workflow_dir"
        
        # Determine the install command for CI
        local setup_step install_cmd_ci check_cmd
        case "$PACKAGE_MANAGER" in
            pnpm)
                setup_step='      - uses: pnpm/action-setup@v4'
                install_cmd_ci='pnpm install --frozen-lockfile'
                check_cmd='pnpm exec prettier --check .'
                ;;
            npm)
                setup_step=''
                install_cmd_ci='npm ci'
                check_cmd='npm exec prettier -- --check .'
                ;;
            yarn)
                setup_step=''
                install_cmd_ci='yarn install --frozen-lockfile'
                check_cmd='yarn exec prettier --check .'
                ;;
            bun)
                setup_step='      - uses: oven-sh/setup-bun@v2'
                install_cmd_ci='bun install --frozen-lockfile'
                check_cmd='bunx prettier --check .'
                ;;
        esac
        
        cat > "$workflow_file" << EOF
name: Format Check
on: [push, pull_request]

jobs:
  check-format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
${setup_step}
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "${PACKAGE_MANAGER}"
      - run: ${install_cmd_ci}
      - run: ${check_cmd}
EOF
        echo -e "${GREEN}✓ GitHub Actions workflow created at ${workflow_file}${NC}"
    fi
    echo
}

show_completion() {
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
}

# --- Main Pipeline ---
main() {
    show_header
    check_prerequisites
    install_prettier
    create_prettierrc
    create_prettierignore
    create_editorconfig
    install_husky_lintstaged
    configure_husky
    configure_lintstaged
    create_github_workflow
    show_completion
}

# Run main function
main "$@"
