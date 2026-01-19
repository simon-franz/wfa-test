# System
#---------------------------------------------------

# Path Variable
export PATH=$HOME/bin:$HOME/.local/bin:/usr/local/bin:$PATH

# Error Suppressor
export SSH_ASKPASS=/bin/true

# For long running commands. How2UseIt: | <mycommand>; alert | sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'
alias l='ls -halF'

# ZSH & oh-my-zsh Setup
export ZSH=$HOME/.oh-my-zsh
ZSH_THEME="bira"
plugins=(git)
source $ZSH/oh-my-zsh.sh

# Functions
# -----------------
# Get user, UID, GID & Home Dir
uInfo() {
  printf "%-20s %-10s %-10s %-30s %-15s\n" "User" "UID" "GID" "Home Directory"
  printf "%-20s %-10s %-10s %-30s %-15s\n" "--------------------" "--------" "--------" "------------------------------"
  cat /etc/passwd | awk -F: '{ print $1, $3, $4, $6 }' | while read user uid gid home; do
    printf "%-20s %-10s %-10s %-30s %-15s\n" "$user" "$uid" "$gid" "$home"
  done
}

# Delete empty folders
rmEmptyDirs() {
  EMPTY_DIRS=( $(find . -type d -empty -print) )
  echo "Current empty directories:"
  printf '%s\n' "${EMPTY_DIRS[@]}"
  read -r -p "Delete empty directories and directories containing only empty directories? (Acutal results may vary) [Y/n] " response
  case $response in
    y|Y|"")
      echo "Deleting following folders:"
      find . -type d -empty -delete -print
      ;;
    *)
      ;;
  esac
}

# Development
#---------------------------------------------------

# Git
# -----------------
alias s='git status'
alias ff='git fetch --all && git pull'
alias gac='echo "Executing \"git add . && git commit -m\"" && git add . && git commit -m'
alias gfd='echo "Executing \"git fetch origin dev:dev\"" && git fetch origin dev:dev'
alias gmd='echo "Executing \"git merge dev\"" && git merge dev'

alias purge='echo "Clean-Up WorkingDir + StagingArea + Remove Empty Dirs" && git restore --staged . && git clean -df && git restore . && rmEmptyDirs'

# Node
# TODO: Remove Node once Storybook runs on v9 or newer
# -----------------
export NODE_INSTALL="$HOME/.node"
export PATH="$NODE_INSTALL/bin:$PATH"

# Bun
# -----------------
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Storybook
# -----------------
alias storybook='bun run --cwd packages/storybook dev'

# Adapterbook
# -----------------
alias adapterbook='bun run --cwd packages/adapterbook dev'

# DevContainer
# -----------------
export DOCKER_BUILDKIT=1
alias docx="~/repos/SmartFace/.devcontainer/scripts/.exec-inside-devcontainer.sh"
alias docip="docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'"

# Cypress
# -----------------
export NODE_TLS_REJECT_UNAUTHORIZED=1
# find & destroy example: find . -type d -name "__diff_output__" -exec rm -rf {} \; 2>/dev/null || true
alias rmDiffs='rm -rf ~/repos/SmartFace/packages/cypress/outputs/plugin/diffs'
alias rmCyErrors='rm -rf ~/repos/SmartFace/packages/cypress/outputs/cyErrors'
alias rmOutputs='rmDiffs && rmCyErrors && rm -rf ~/repos/SmartFace/packages/cypress/outputs/downloads'
alias cygui='rmOutputs && export DISPLAY=:0 && bun run --bun --silent --cwd packages/cypress cy open --component'
alias cycli='rmOutputs && unset DISPLAY && bun run --bun --silent --cwd packages/cypress cy run --headless --component -b chrome'

cycomp() {
  rmOutputs
  local param="$1"
  
  if [ -z "$param" ]; then
    echo "Error: Bitte die zu testende Komponente angeben. Beispiel 'cycomp Alert'."
    return 1
  fi
  
  local found_spec
  found_spec=$(find "$(pwd)" -name "${param}.cy.tsx" -type f 2>/dev/null | head -n 1)
  
  if [ -z "$found_spec" ]; then
    found_spec=$(find "$(pwd)" -name "*.cy.tsx" -type f 2>/dev/null | grep -i "${param}" | head -n 1)
  fi
  
  if [ -z "$found_spec" ]; then
    echo "Error: Test für die Komponente '${param}' konnte nicht gefunden werden."
    return 1
  fi

  unset DISPLAY

  unset CYPRESS_SINGLE_SPEC_MODE
  CYPRESS_SINGLE_SPEC_MODE=true bun run --bun --silent --cwd packages/cypress cy run --headless --spec "${found_spec}" --component -b chrome
}

# Standalone Server
# -----------------
alias api="bun run --cwd packages/mock-internal-api dev"
alias nextport='bun run --cwd packages/export-server-next'
alias zeitkiosk="(bun run --cwd packages/mock-internal-api dev &) && (bun run --bun --cwd packages/zeitkiosk dev-https &)"
alias zeitkioskHttp="(bun run --cwd packages/mock-internal-api dev &) && (bun run --bun --cwd packages/zeitkiosk dev &)"
alias sp='bun --bun turbo run dev:stepo --parallel --no-daemon'
alias stellenportal='bun --bun turbo run dev:stepo --parallel --no-daemon'

# Login
# -----------------
alias loginPage="bun run --bun --cwd packages/login dev"
alias loginBuild="docker build -f ./packages/login/Dockerfile . -t testlogin:deploylogin"
alias loginRun="docker run -d --name loginName -p 4242:3000 testlogin:deploylogin"
alias loginDocx="docker exec -it loginName /bin/sh"
alias purgeDocker="docker system prune -af && docker volume prune -f"

# Smartface
# -----------------
alias smartface='bun run --cwd packages/smartface smartface'
alias sma='bun run --cwd packages/smartface mock-api'
alias sd='bun run --cwd packages/smartface smartface dev smartface-ui'
alias sb='bun run --cwd packages/smartface smartface build smartface-ui'
alias dev='bun turbo run dev:all --parallel --no-daemon'
alias mock-api='bun turbo run mock-api -F @hrworks/smartface'

# Design System
# -----------------
alias build-theme='bun run --cwd packages/design-system build-theme'

# Code Quality & Analysis
# -----------------
alias knip='bun --bun knip' # enforcing bun negatively affects knip's performance :sad-emoji:
alias lint='bun turbo run lint'

# MISC
# -----------------
alias i='bun install'
# Go to SmartFace Repo Directory
cd ~/repos/SmartFace

# Disable Telemetry in Turborepo
export DO_NOT_TRACK=1

# SSH
# -----------------
# Forwarded SSH-Agent-Socket
export SSH_AUTH_SOCK="/home/sfUser/.ssh/agent.sock"

setup_ssh_agent() { 
  eval $(ssh-agent) > /dev/null 
  ssh-add ~/.ssh/id_ed25519_github 
}

if [ -S "$SSH_AUTH_SOCK" ]; then
    # Exit codes
    # 0 = keys loaded
    # 1 = no keys
    # 2 = agent not running
    ssh-add -l > /dev/null 2>&1
    EXIT_CODE=$?
    if [ $EXIT_CODE -eq 0 ]; then
        echo "SSH-Schlüssel bereits hinzugefügt."
    elif [ $EXIT_CODE -eq 1 ]; then
        echo "SSH-Schlüssel wird zum SSH-Agent hinzugefügt."
        ssh-add ~/.ssh/id_ed25519_github
    elif [ $EXIT_CODE -eq 2 ]; then
        echo "SSH-Agent nicht erreichbar. Starte SSH-Agent & füge SSH-Schlüssel hinzu."
        setup_ssh_agent
    fi
else
    echo "SSH-Agent-Socket nicht gefunden. Starte SSH-Agent & füge SSH-Schlüssel hinzu."
    setup_ssh_agent
fi

# Clean up
#---------------------------------------------------
clear
