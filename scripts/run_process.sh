#!/bin/bash

# Set error handling
set -e

# Full path definitions
PROJECT_DIR="/home/cellery/Projects/ferc-elibrary-api"
LOG_DIR="$PROJECT_DIR/logs"
LOG_FILE="$LOG_DIR/process.log"
ERROR_LOG="$LOG_DIR/error.log"

# Set up Node.js environment
export NVM_DIR="/home/cellery/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# Ensure proper PATH
export PATH="/home/cellery/.nvm/versions/node/v22.14.0/bin:/usr/local/bin:$PATH"

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

# Load environment variables
source "$PROJECT_DIR/.env"

# Run the process
node scripts/process_orders.js >> "$LOG_FILE" 2>> "$ERROR_LOG"

# Log completion
echo "=== Process Completed at $(date) ===" >> "$LOG_FILE"
echo "----------------------------------------" >> "$LOG_FILE" 