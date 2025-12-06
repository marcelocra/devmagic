FROM mcr.microsoft.com/devcontainers/base:alpine-3.22

# Use zsh for all RUN instructions during build.
SHELL ["/bin/zsh", "-c"]

# Set system environment variables (envs).
ENV USER=vscode
ENV HOME=/home/$USER
ENV SHELL=/bin/zsh
ENV TZ=America/Sao_Paulo
ENV LC_ALL=en_US.UTF-8
ENV LANG=en_US.UTF-8

# Set user-specific envs.
ENV MCRA_PROJECTS=$HOME/prj
ENV MCRA_GITHUB=marcelocra

# Set repository envs and paths.
ENV MCRA_DOTFILES=$MCRA_PROJECTS/dotfiles

# Install minimal system packages including Node.js and Deno.
RUN apk update && \
    apk add --no-cache \
        curl \
        git \
        git-lfs \
        tmux \
        build-base \
        nodejs \
        npm \
        deno \
        xclip

# Install GitHub CLI from official release.
RUN cd /tmp && \
    ARCH=$(uname -m) && \
    if [ "$ARCH" = "x86_64" ]; then ARCH="amd64"; fi && \
    if [ "$ARCH" = "aarch64" ]; then ARCH="arm64"; fi && \
    GH_VERSION=$(wget -qO- https://api.github.com/repos/cli/cli/releases/latest | grep '"tag_name"' | cut -d'"' -f4) && \
    wget https://github.com/cli/cli/releases/download/${GH_VERSION}/gh_${GH_VERSION#v}_linux_${ARCH}.tar.gz && \
    wget https://github.com/cli/cli/releases/download/${GH_VERSION}/gh_${GH_VERSION#v}_checksums.txt && \
    grep "gh_${GH_VERSION#v}_linux_${ARCH}.tar.gz" gh_${GH_VERSION#v}_checksums.txt | sha256sum -c && \
    tar -xzf gh_${GH_VERSION#v}_linux_${ARCH}.tar.gz && \
    mv gh_${GH_VERSION#v}_linux_${ARCH}/bin/gh /usr/bin/ && \
    chmod +x /usr/bin/gh && \
    rm -rf /tmp/gh_*

# Install global npm packages (must run as root before USER switch).
# (Not using right now, but might use later: "@openai/codex".)
RUN npm install -g \
    @google/gemini-cli \
    @anthropic-ai/claude-code \
    @github/copilot

# Switch to user.
USER $USER
WORKDIR $HOME

# Create folder structures, clone relevant repos and symlink configs.
RUN mkdir -p $MCRA_PROJECTS && \
    git clone https://github.com/$MCRA_GITHUB/dotfiles.git $MCRA_DOTFILES && \
    ln -sf $MCRA_DOTFILES/tmux/.tmux.conf $HOME/.tmux.conf && \
    printf '\n\nsource $MCRA_DOTFILES/shell/init.sh\n\n' >> $HOME/.bashrc && \
    printf '\n\nsource $MCRA_DOTFILES/shell/init.sh\n\n' >> $HOME/.zshrc

# Default command.
CMD ["/bin/zsh"]
