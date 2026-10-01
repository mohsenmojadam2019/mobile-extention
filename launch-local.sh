#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
PROFILE="${HOME}/.cache/responsive-device-switcher"
PORT="${RESPONSIVE_DEBUG_PORT:-9333}"
URL="${1:-http://127.0.0.1:8210/}"
mkdir -p "$PROFILE"
exec google-chrome \
  --user-data-dir="$PROFILE" \
  --no-first-run \
  --no-default-browser-check \
  --disable-default-apps \
  --load-extension="$ROOT" \
  --remote-debugging-port="$PORT" \
  "$URL"
