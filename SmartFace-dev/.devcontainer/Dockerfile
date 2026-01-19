# TODO: fix vulnerability
FROM debian:bookworm-slim

# 1. ARG, ENV & EXPOSE
ARG USERNAME=sfUser
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG CYPRESS_VERSION=14.2.1
ARG CHROME_VERSION=134.0.6998.165
ARG NODE_VERSION=24.11.1
ARG BUN_VERSION=1.3.3

ENV DEBIAN_FRONTEND=noninteractive \
    PATH=/home/$USERNAME/.bun/bin:$PATH \
    SHELL=/usr/bin/zsh \
    TERMINAL=zsh \
    TERMINALTHEME=bira \
    XDG_RUNTIME_DIR=/tmp/runtime-root \
    CYPRESS_CACHE_FOLDER=/home/$USERNAME/.cache/Cypress \
    SSH_ASKPASS=/bin/true

EXPOSE 3000 4000 5000 6006

# 2. DEPENDENCIES & USER
RUN apt-get update && apt-get install -y --no-install-recommends \
    aria2 sudo curl wget git zsh openssh-client ca-certificates unzip \
    net-tools nano xvfb libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev \
    libnss3 libxss1 libasound2 libxtst6 xauth gnupg fonts-liberation \
    libatk-bridge2.0-0 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 \
    libvulkan1 xdg-utils && \
    # Chrome
    aria2c -x 16 -s 16 -o /tmp/google-chrome-stable.deb \
    "https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}-1_amd64.deb" && \
    dpkg -i /tmp/google-chrome-stable.deb || apt-get -f install -y && \
    dpkg -i /tmp/google-chrome-stable.deb && \
    rm /tmp/google-chrome-stable.deb && \
    ln -sf /usr/bin/google-chrome-stable /usr/bin/google-chrome && \
    # User
    groupadd --gid $USER_GID $USERNAME && \
    useradd --uid $USER_UID --gid $USER_GID -m $USERNAME && \
    echo "$USERNAME ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME && \
    chmod 0440 /etc/sudoers.d/$USERNAME && \
    chsh -s $(which zsh) && \
    # Dirs & Perms
    mkdir -p $XDG_RUNTIME_DIR && \
    chmod 700 $XDG_RUNTIME_DIR && \
    groupadd -g 1001 runnergroup && \
    usermod -aG runnergroup $USERNAME && \
    mkdir -p /home/$USERNAME/.ssh /home/$USERNAME/repos/SmartFace $CYPRESS_CACHE_FOLDER && \
    chmod 700 /home/$USERNAME/.ssh && \
    chown -R $USERNAME:$USERNAME /home/$USERNAME $XDG_RUNTIME_DIR && \
    # Cleanup
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

USER $USERNAME
WORKDIR /home/$USERNAME/repos/SmartFace

# 3. NODE
# Storybook requires Node.js for proper functionality
# TODO: Remove Node once Storybook runs on v9 or newer
RUN aria2c -x 16 -s 16 -o node.tar.gz https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz && \
    tar -xzf node.tar.gz && \
    mv node-v${NODE_VERSION}-linux-x64 /home/$USERNAME/.node && \
    rm node.tar.gz && \
    export PATH="/home/$USERNAME/.node/bin:$PATH"

# 4. BUN & CYPRESS
RUN aria2c -x 16 -s 16 -o bun-install.sh https://bun.com/install && \
    bash bun-install.sh "bun-v${BUN_VERSION}" && \
    rm bun-install.sh && \
    export PATH="/home/$USERNAME/.bun/bin:$PATH" && \
    bunx cypress@${CYPRESS_VERSION} install

# 5. ZSH
RUN aria2c -x 16 -s 16 -o zsh-in-docker.sh https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh && \
    sh zsh-in-docker.sh -- \
    -t bira \
    -p git \
    -p ssh-agent \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions && \
    rm zsh-in-docker.sh

COPY --chown=$USERNAME:$USERNAME .zshrc /home/$USERNAME/.zshrc

# 6. ENTRYPOINT
ENTRYPOINT ["/home/sfUser/repos/SmartFace/.devcontainer/scripts/.postCreateCommandScript.sh"]
CMD ["/bin/zsh"]
