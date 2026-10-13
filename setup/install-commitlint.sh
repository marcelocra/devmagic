#!/usr/bin/env bash
# DevMagic - Commitlint Installation Script
# Installs and configures commitlint (Conventional Commits), a Husky commit-msg hook and a CI check
# Usage:
#   Latest version: curl -fsSL https://devmagic.run/install/commitlint | bash
#   With npm: curl -fsSL https://devmagic.run/install/commitlint?pm=npm | bash

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
    echo "✨ Commitlint Installation"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Setting up Conventional Commits enforcement"
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

    # GitHub reads workflows only from <repo root>/.github/workflows
    local repo_root
    repo_root=$(git rev-parse --show-toplevel)
    if [[ "$repo_root" != "$(pwd -P)" ]]; then
        echo -e "${RED}❌ Run this installer at the repository root (${repo_root}).${NC}"
        echo -e "${YELLOW}   GitHub reads workflows only from <root>/.github/workflows.${NC}"
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
            # Yarn Classic refuses to add to a workspace root without -W
            if is_workspace; then
                echo "yarn add -W ${dev_flag} ${packages}"
            else
                echo "yarn add ${dev_flag} ${packages}"
            fi
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
            echo "--exact"
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

# Command prefix that runs commitlint and forwards flags to it. npm exec and
# yarn exec (v1) swallow flags such as --edit unless they follow "--" or the
# binary is run directly, so those two need their own form.
get_commitlint_cmd() {
    case "$PACKAGE_MANAGER" in
        npm)
            echo "$(get_exec_cmd "commitlint") --"
            ;;
        yarn)
            echo "yarn commitlint"
            ;;
        *)
            get_exec_cmd "commitlint"
            ;;
    esac
}

install_commitlint() {
    echo -e "${BLUE}📦 Step 1/5: Installing commitlint...${NC}"

    local dev_flag
    dev_flag=$(get_dev_flag)
    local exact_flag
    exact_flag=$(get_exact_flag)
    local install_cmd
    install_cmd=$(get_install_cmd "@commitlint/cli @commitlint/config-conventional" "${dev_flag} ${exact_flag}")

    echo -e "${YELLOW}Running: ${install_cmd}${NC}"
    eval "$install_cmd"

    echo -e "${GREEN}✓ commitlint installed${NC}"
    echo
}

# Runs a JavaScript snippet with node, or with bun on a machine that has only bun
run_js() {
    if command -v node &>/dev/null; then
        node -e "$1"
    else
        bun -e "$1"
    fi
}

# Exits 0 when package.json has the given top-level key
package_json_has() {
    run_js 'process.exit(JSON.parse(require("fs").readFileSync("package.json","utf8"))["'"$1"'"] === undefined ? 1 : 0)'
}

create_commitlint_config() {
    echo -e "${BLUE}📝 Step 2/5: Creating commitlint.config.js...${NC}"

    # commitlint reads only one config; skip if any place it searches already has one
    # (the list is @commitlint/load's searchPlaces, commitlint 21)
    local existing=""
    local candidate
    for candidate in commitlint.config.js commitlint.config.cjs commitlint.config.mjs \
        commitlint.config.ts commitlint.config.cts commitlint.config.mts \
        .commitlintrc .commitlintrc.json .commitlintrc.yaml .commitlintrc.yml \
        .commitlintrc.js .commitlintrc.cjs .commitlintrc.mjs \
        .commitlintrc.ts .commitlintrc.cts .commitlintrc.mts; do
        if [[ -f "$candidate" ]]; then
            existing="$candidate"
            break
        fi
    done
    if [[ -z "$existing" ]] && package_json_has commitlint; then
        existing='the "commitlint" field in package.json'
    elif [[ -z "$existing" ]] && [[ -f package.yaml ]] && grep -Eq '^commitlint[[:space:]]*:' package.yaml; then
        existing='the "commitlint" field in package.yaml'
    fi

    if [[ -n "$existing" ]]; then
        echo -e "${YELLOW}⚠️  ${existing} already exists, skipping...${NC}"
    elif run_js 'process.exit(JSON.parse(require("fs").readFileSync("package.json","utf8")).type === "module" ? 0 : 1)'; then
        # ES module project: a .js file must use export syntax
        cat > commitlint.config.js << 'EOF'
export default { extends: ['@commitlint/config-conventional'] };
EOF
        echo -e "${GREEN}✓ commitlint.config.js created (ES module)${NC}"
    else
        cat > commitlint.config.js << 'EOF'
module.exports = { extends: ['@commitlint/config-conventional'] };
EOF
        echo -e "${GREEN}✓ commitlint.config.js created (CommonJS)${NC}"
    fi
    echo
}

install_husky() {
    echo -e "${BLUE}🪝 Step 3/5: Setting up Husky...${NC}"

    # The prettier installer (or the project) may have set Husky up already
    if [[ -d ".husky" ]]; then
        echo -e "${YELLOW}⚠️  .husky already exists, reusing it...${NC}"
    else
        local dev_flag
        dev_flag=$(get_dev_flag)
        local install_cmd
        install_cmd=$(get_install_cmd "husky" "${dev_flag}")

        echo -e "${YELLOW}Running: ${install_cmd}${NC}"
        eval "$install_cmd"

        local husky_init
        husky_init=$(get_exec_cmd "husky init")
        echo -e "${YELLOW}Running: ${husky_init}${NC}"
        eval "$husky_init"

        # 'husky init' writes a sample pre-commit hook that runs '<pm> test'.
        # Remove it when untouched: it would block every commit in projects without a test script.
        if [[ -f ".husky/pre-commit" ]] && [[ "$(tr -d '[:space:]' < .husky/pre-commit)" =~ ^(pnpm|npm|yarn|bun)test$ ]]; then
            rm .husky/pre-commit
            echo -e "${YELLOW}Removed the sample .husky/pre-commit created by husky init${NC}"
        fi

        echo -e "${GREEN}✓ Husky installed and initialized${NC}"
    fi
    echo
}

create_commit_msg_hook() {
    echo -e "${BLUE}🪝 Step 4/5: Creating .husky/commit-msg hook...${NC}"

    local hook_file=".husky/commit-msg"
    local commitlint_cmd
    commitlint_cmd=$(get_commitlint_cmd)

    if [[ -f "$hook_file" ]] && grep -q commitlint "$hook_file"; then
        echo -e "${YELLOW}⚠️  ${hook_file} already runs commitlint, skipping...${NC}"
    elif [[ -f "$hook_file" ]]; then
        # Keep the project's own checks and add commitlint after them
        [[ -s "$hook_file" && "$(tail -c 1 "$hook_file")" != "" ]] && echo >> "$hook_file"
        echo "${commitlint_cmd} --edit \"\$1\"" >> "$hook_file"
        chmod +x "$hook_file"
        echo -e "${GREEN}✓ commitlint added to the existing ${hook_file}${NC}"
    else
        cat > "$hook_file" << EOF
${commitlint_cmd} --edit "\$1"
EOF
        chmod +x "$hook_file"
        echo -e "${GREEN}✓ ${hook_file} created${NC}"
    fi
    echo
}

create_github_workflow() {
    echo -e "${BLUE}🔄 Step 5/5: Creating GitHub Actions workflow...${NC}"

    local workflow_dir=".github/workflows"
    local workflow_file="${workflow_dir}/commitlint.yml"

    if [[ -f "$workflow_file" ]]; then
        echo -e "${YELLOW}⚠️  GitHub Actions workflow already exists, skipping...${NC}"
    else
        mkdir -p "$workflow_dir"

        # Determine the install command for CI
        local setup_step install_cmd_ci check_cmd node_cache
        # Single quotes on purpose: ${{ ... }} is a GitHub Actions expression, not shell
        # shellcheck disable=SC2016
        local range_args='--from ${{ github.event.pull_request.base.sha }} --to ${{ github.event.pull_request.head.sha }} --verbose'
        check_cmd="$(get_commitlint_cmd) ${range_args}"
        node_cache=$'\n          cache: "'"${PACKAGE_MANAGER}"'"'
        case "$PACKAGE_MANAGER" in
            pnpm)
                setup_step='      - uses: pnpm/action-setup@v4'
                # The action reads the packageManager field; without one it needs a version
                if ! package_json_has packageManager; then
                    setup_step+=$'\n        with:\n          version: '"$(pnpm --version)"
                fi
                install_cmd_ci='pnpm install --frozen-lockfile'
                ;;
            npm)
                setup_step=''
                install_cmd_ci='npm ci'
                ;;
            yarn)
                setup_step=''
                install_cmd_ci='yarn install --frozen-lockfile'
                ;;
            bun)
                setup_step='      - uses: oven-sh/setup-bun@v2'
                # actions/setup-node has no bun cache
                node_cache=''
                install_cmd_ci='bun install --frozen-lockfile'
                ;;
        esac

        cat > "$workflow_file" << EOF
name: Commitlint
on: pull_request

jobs:
  commitlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
${setup_step}
      - uses: actions/setup-node@v4
        with:
          node-version: "20"${node_cache}
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
    echo "✨ Commitlint setup complete!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${NC}"
    echo "What was configured:"
    echo "  ✓ commitlint installed with exact version pinning"
    echo "  ✓ commitlint.config.js extending the Conventional Commits preset"
    echo "  ✓ Husky for Git hooks"
    echo "  ✓ .husky/commit-msg hook that validates every commit message"
    echo "  ✓ GitHub Actions workflow that checks pull request commits"
    echo
    echo "Next steps:"
    echo "  1. Try a bad commit: git commit --allow-empty -m 'bad message' (it should be rejected)"
    echo "  2. Use messages like 'feat: add login' or 'fix: handle empty input'"
    echo "  3. Customize commitlint.config.js with your own rules (optional)"
    echo
    echo -e "${YELLOW}Note: Your commit messages must now follow the Conventional Commits format.${NC}"
    echo
}

# --- Main Pipeline ---
main() {
    show_header
    check_prerequisites
    install_commitlint
    create_commitlint_config
    install_husky
    create_commit_msg_hook
    create_github_workflow
    show_completion
}

# Run main function
main "$@"
