#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$SCRIPT_DIR/.."
PID_FILE="$ROOT/.dev.pid"

kill_server() {
  # Kill by PID file
  if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
      echo "Stopping dev server (PID $PID)..."
      kill "$PID" 2>/dev/null || true
      for i in $(seq 1 10); do
        kill -0 "$PID" 2>/dev/null || break
        sleep 0.5
      done
      if kill -0 "$PID" 2>/dev/null; then
        kill -9 "$PID" 2>/dev/null || true
      fi
    fi
    rm -f "$PID_FILE"
  fi

  # Kill any orphaned vite processes for this project
  PIDS=$(pgrep -f "vite" 2>/dev/null | grep -v "^$$" || true)
  if [ -n "$PIDS" ]; then
    echo "Killing orphaned vite process(es): $PIDS"
    kill -9 $PIDS 2>/dev/null || true
  fi
}

kill_server
echo "Server stopped."
