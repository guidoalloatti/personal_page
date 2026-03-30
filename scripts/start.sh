#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$SCRIPT_DIR/.."
PID_FILE="$ROOT/.dev.pid"
LOG_FILE="$ROOT/.dev.log"

if [ -f "$PID_FILE" ]; then
  PID=$(cat "$PID_FILE")
  if kill -0 "$PID" 2>/dev/null; then
    echo "Dev server already running (PID $PID)"
    echo "Run scripts/stop.sh to stop it first."
    exit 1
  else
    rm -f "$PID_FILE"
  fi
fi

cd "$ROOT"

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Starting dev server..."
nohup npm run dev > "$LOG_FILE" 2>&1 &
echo $! > "$PID_FILE"

# Wait for server to be ready
for i in $(seq 1 20); do
  if grep -q "Local:" "$LOG_FILE" 2>/dev/null; then
    URL=$(grep "Local:" "$LOG_FILE" | sed 's/.*Local: *//')
    echo "Server ready at $URL"
    echo "Logs: $LOG_FILE  |  PID: $(cat $PID_FILE)"
    exit 0
  fi
  sleep 0.5
done

echo "Server started (PID $(cat $PID_FILE)) — may still be initializing"
echo "Check logs: tail -f $LOG_FILE"
