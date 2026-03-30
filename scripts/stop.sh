#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$SCRIPT_DIR/.."
PID_FILE="$ROOT/.dev.pid"

if [ ! -f "$PID_FILE" ]; then
  echo "No PID file found — server may not be running."
  # Fallback: kill any vite process in this project
  PIDS=$(pgrep -f "vite.*personal_page" 2>/dev/null || true)
  if [ -n "$PIDS" ]; then
    echo "Found orphaned vite process(es): $PIDS — killing..."
    kill $PIDS 2>/dev/null || true
    echo "Done."
  fi
  exit 0
fi

PID=$(cat "$PID_FILE")

if kill -0 "$PID" 2>/dev/null; then
  echo "Stopping dev server (PID $PID)..."
  kill "$PID"
  # Wait up to 5s for it to exit
  for i in $(seq 1 10); do
    kill -0 "$PID" 2>/dev/null || break
    sleep 0.5
  done
  if kill -0 "$PID" 2>/dev/null; then
    echo "Process did not exit cleanly, force killing..."
    kill -9 "$PID" 2>/dev/null || true
  fi
  echo "Server stopped."
else
  echo "Process $PID not found — was already stopped."
fi

rm -f "$PID_FILE"
