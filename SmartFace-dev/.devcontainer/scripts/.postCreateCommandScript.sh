#!/bin/bash

# SHELL
export SHELL=$(which zsh)
cd /home/sfUser/repos/SmartFace
cp /home/sfUser/.gitconfig-host /home/sfUser/.gitconfig 2>/dev/null || true

loading_animation() {
  local pid=$1
  local message=$2
  local delay=0.2
  local spin=('⠋' '⠙' '⠹' '⠸' '⠼' '⠴' '⠦' '⠧' '⠇' '⠏')
  local i=0
  clear
  while kill -0 "$pid" 2>/dev/null; do
      printf "\r${spin[$i]}  $message"
      ((i=(i+1)%10))
      sleep $delay
  done
}

# Bun
CI=1 bun install &
loading_animation $! "Update packages dependencies..."

# FINISH
clear
PURPLE='\033[38;2;216;141;255m'
GREEN='\033[1;32m'
NC='\033[0m'   
echo -e "${GREEN}DevContainer ready.${NC}"
ascii_art="
${PURPLE}               ,,,,,,,,,,,,,,,,,,,,  *                       
           ,,,,,,,,,,,,,,,,,,,,,,,,*                         
         ,,,,,,,,,,,,,,,,,,,,,,,,*                           
       ,,,,,,,,,,,,            ,                             
      ,,,,,,,,,,              *                              
     ,,,,,,,,,              *                                
    .,,,,,,,,,            *,,,,,                             
     ,,,,,,,,,           ,,,,,,,,,                           
     ,,,,,,,,,,        *,,,,,,,,,,,,                         
      ,,,,,,,,,,     *     ,,,,,,,,,,                        
       ,,,,,,,,,,,,*        .,,,,,,,,,                       
         ,,,,,,,,,           ,,,,,,,,,,                      
            ,,,,*            ,,,,,,,,,,                      
              *              ,,,,,,,,,                       
            *              ,,,,,,,,,,.                       
           ,            ,,,,,,,,,,,,                         
         *,,,,,,,,,,,,,,,,,,,,,,,,.                          
       *,,,,,,,,,,,,,,,,,,,,,,,,                             
     .  ,,,,,,,,,,,,,,,,,,,,   ${NC}
"
echo -e "$ascii_art"

# KEEP SESSION ALIVE IN CI ENVIRONMENT
if [ "$EXECTUTION_ENVIRONMENT" = "CI" ]; then
  echo "Running in CI environment. Keeping container alive..."
  exec tail -f /dev/null
else
  echo "Running in development environment. Proceeding with interactive shell."
fi
