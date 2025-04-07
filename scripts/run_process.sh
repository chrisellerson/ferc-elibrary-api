#!/bin/bash

# Change to project directory
cd /path/to/your/project

# Ensure node and npm are in path
export PATH="/usr/local/bin:$PATH"

# Load environment variables
source .env

# Run the process
node scripts/process_orders.js >> logs/process.log 2>&1 