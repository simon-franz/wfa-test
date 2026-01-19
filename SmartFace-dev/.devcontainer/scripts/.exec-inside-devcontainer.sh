#!/bin/bash

find_devcontainer() {
  local config_file=".devcontainer/devcontainer.json"
  local current_dir=$(pwd)
  while [[ "$current_dir" != "/" ]]; do
    if [[ -f "$current_dir/$config_file" ]]; then
      echo "$current_dir"
      return 0
    fi
    current_dir=$(dirname "$current_dir")
  done
  echo ""
  return 1
}

devcontainer_path=$(find_devcontainer)
if [[ -z "$devcontainer_path" ]]; then
  echo "No DevContainer configuration found in the current directory or its parents."
  exit 1
fi

container_id=$(docker ps --filter "label=devcontainer.config_file=$devcontainer_path/.devcontainer/devcontainer.json" --format "{{.ID}}")
if [[ -z "$container_id" ]]; then
  echo "No running DevContainer found for this project."
  exit 1
fi

docker exec -it "$container_id" "${@:-/usr/bin/zsh}"
