#!/bin/bash

# Simple, lightweight cleanup script for small droplets
# Uses standard Unix commands for memory efficiency

PROJECT_DIR="/home/silentquadrant/projects/ferc-elibrary-api"
DOWNLOADS_DIR="$PROJECT_DIR/downloads"
LOGS_DIR="$PROJECT_DIR/logs"
TEMP_DIR="$PROJECT_DIR/temp"

echo "🧽 Starting simple storage cleanup..."

# Configuration
DOWNLOAD_RETENTION_DAYS=30
LOG_RETENTION_DAYS=90
MAX_LOG_SIZE_MB=50

cd "$PROJECT_DIR" || exit 1

# Clean temp files (always clean test artifacts)
if [ -d "$TEMP_DIR" ]; then
    echo "🧹 Cleaning temp files..."
    TEMP_SIZE=$(du -sm "$TEMP_DIR" 2>/dev/null | cut -f1)
    rm -f "$TEMP_DIR"/*
    echo "  ✅ Cleaned temp directory (${TEMP_SIZE}MB freed)"
fi

# Clean old downloads (older than 30 days)
if [ -d "$DOWNLOADS_DIR" ]; then
    echo "🧹 Cleaning downloads older than $DOWNLOAD_RETENTION_DAYS days..."
    OLD_FILES=$(find "$DOWNLOADS_DIR" -name "*.pdf" -mtime +$DOWNLOAD_RETENTION_DAYS -type f 2>/dev/null | wc -l)
    if [ "$OLD_FILES" -gt 0 ]; then
        find "$DOWNLOADS_DIR" -name "*.pdf" -mtime +$DOWNLOAD_RETENTION_DAYS -type f -delete 2>/dev/null
        echo "  ✅ Removed $OLD_FILES old PDF files"
    else
        echo "  ✅ No old downloads to clean"
    fi
    
    # Check downloads directory size and clean oldest if > 500MB
    if command -v du >/dev/null 2>&1; then
        DOWNLOADS_SIZE=$(du -sm "$DOWNLOADS_DIR" 2>/dev/null | cut -f1)
        if [ "$DOWNLOADS_SIZE" -gt 500 ]; then
            echo "  ⚠️  Downloads directory is ${DOWNLOADS_SIZE}MB, removing oldest files..."
            # Remove oldest files until under 400MB
            ls -t "$DOWNLOADS_DIR"/*.pdf 2>/dev/null | tail -n +20 | head -n 10 | xargs rm -f 2>/dev/null
            echo "  ✅ Removed oldest files to free space"
        fi
    fi
fi

# Clean old logs and rotate large ones
if [ -d "$LOGS_DIR" ]; then
    echo "🧹 Managing log files..."
    
    # Remove old rotated logs
    find "$LOGS_DIR" -name "*.log.*" -mtime +$LOG_RETENTION_DAYS -type f -delete 2>/dev/null
    
    # Rotate large log files
    for logfile in "$LOGS_DIR"/*.log; do
        if [ -f "$logfile" ]; then
            # Check if file is larger than 50MB (using ls and awk for compatibility)
            SIZE_KB=$(ls -l "$logfile" 2>/dev/null | awk '{print $5}')
            SIZE_MB=$((SIZE_KB / 1024 / 1024))
            
            if [ "$SIZE_MB" -gt "$MAX_LOG_SIZE_MB" ]; then
                TIMESTAMP=$(date +%Y%m%d)
                BASENAME=$(basename "$logfile")
                echo "  📋 Rotating large log: $BASENAME (${SIZE_MB}MB)"
                mv "$logfile" "${logfile}.${TIMESTAMP}"
                touch "$logfile"
            fi
        fi
    done
    echo "  ✅ Log management completed"
fi

# Show final status
echo ""
echo "✨ Cleanup completed!"
if command -v du >/dev/null 2>&1; then
    FINAL_SIZE=$(du -sm "$PROJECT_DIR" 2>/dev/null | cut -f1)
    echo "📁 Project size: ${FINAL_SIZE}MB"
fi

# Show disk usage
echo "💾 Disk usage:"
df -h / | tail -1 | awk '{print "  Used: " $3 " / " $2 " (" $5 ")"}'
