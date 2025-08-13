#!/bin/bash

# Set error handling
set -e

# Full path definitions
PROJECT_DIR="/home/silentquadrant/projects/ferc-elibrary-api"
LOG_DIR="$PROJECT_DIR/logs"
LOG_FILE="$LOG_DIR/process.log"
ERROR_LOG="$LOG_DIR/error.log"

# Set up Node.js environment (using system-installed Node.js)
# Add system Node.js path
export PATH="/usr/bin:$PATH"

# Create logs directory if it doesn't exist
mkdir -p "$LOG_DIR"

# Log start with timestamp
echo "=== Process Started at $(date) ===" >> "$LOG_FILE" 2>> "$ERROR_LOG"

# Change to project directory
cd "$PROJECT_DIR" || {
    echo "Failed to change to project directory" >> "$ERROR_LOG"
    exit 1
}

# Log current directory and environment
echo "Current directory: $(pwd)" >> "$LOG_FILE"
echo "User running script: $(whoami)" >> "$LOG_FILE"
echo "PATH: $PATH" >> "$LOG_FILE"

# Ensure node is available
if ! command -v node &> /dev/null; then
    echo "Node.js not found in PATH" >> "$ERROR_LOG"
    exit 1
fi

# Log node version
echo "Node version: $(node -v)" >> "$LOG_FILE"

# Verify .env file exists
if [ ! -f "$PROJECT_DIR/.env" ]; then
    echo ".env file not found" >> "$ERROR_LOG"
    exit 1
fi

# Note: Environment variables are loaded by the Node.js script using dotenv
# No need to source .env in bash - this avoids parsing issues

# Run the process
node scripts/process_orders.js >> "$LOG_FILE" 2>> "$ERROR_LOG"

# Run cleanup to manage storage
echo "Starting storage cleanup..." >> "$LOG_FILE"
"$PROJECT_DIR/scripts/simple_cleanup.sh" >> "$LOG_FILE" 2>> "$ERROR_LOG"

# Log completion
echo "=== Process Completed at $(date) ===" >> "$LOG_FILE"
echo "----------------------------------------" >> "$LOG_FILE" 