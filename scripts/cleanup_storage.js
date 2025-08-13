#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

/**
 * Storage cleanup script to prevent disk space issues
 * Cleans up old downloaded PDFs, logs, and temporary files
 */

// Configuration
const config = {
    // Keep downloaded PDFs for 30 days
    downloadRetentionDays: 30,
    // Keep logs for 90 days
    logRetentionDays: 90,
    // Always clean temp files (test artifacts)
    cleanTempFiles: true,
    // Maximum total storage for downloads directory (500MB)
    maxDownloadStorageMB: 500
};

const PROJECT_DIR = process.cwd();
const DOWNLOADS_DIR = path.join(PROJECT_DIR, 'downloads');
const LOGS_DIR = path.join(PROJECT_DIR, 'logs');
const TEMP_DIR = path.join(PROJECT_DIR, 'temp');

/**
 * Get file age in days
 */
function getFileAgeDays(filePath, stats) {
    const now = new Date();
    const fileTime = stats.mtime;
    const diffTime = Math.abs(now - fileTime);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get directory size in MB (memory-efficient version)
 */
async function getDirectorySize(dirPath) {
    if (!existsSync(dirPath)) return 0;
    
    try {
        // Use du command for memory efficiency instead of Node.js recursion
        const { exec } = await import('child_process');
        const { promisify } = await import('util');
        const execAsync = promisify(exec);
        
        const { stdout } = await execAsync(`du -sm "${dirPath}" 2>/dev/null || echo "0"`);
        const sizeMB = parseInt(stdout.split('\t')[0]) || 0;
        return sizeMB;
    } catch (error) {
        console.warn(`Could not get size for ${dirPath}: ${error.message}`);
        return 0;
    }
}

/**
 * Clean up files older than specified days (memory-efficient)
 */
async function cleanupOldFiles(dirPath, retentionDays, filePattern = null) {
    if (!existsSync(dirPath)) {
        console.log(`Directory ${dirPath} does not exist, skipping...`);
        return { cleaned: 0, size: 0 };
    }

    console.log(`\n🧹 Cleaning files older than ${retentionDays} days in ${dirPath}`);
    
    let cleanedCount = 0;
    let cleanedSize = 0;
    
    try {
        // Use find command for memory efficiency
        const { exec } = await import('child_process');
        const { promisify } = await import('util');
        const execAsync = promisify(exec);
        
        // Find files older than retention days
        const pattern = filePattern ? `-name "${filePattern.source || filePattern}"` : '';
        const findCmd = `find "${dirPath}" -maxdepth 1 -type f ${pattern} -mtime +${retentionDays} -print0 2>/dev/null || true`;
        
        const { stdout } = await execAsync(findCmd);
        const files = stdout.split('\0').filter(f => f.length > 0);
        
        for (const filePath of files) {
            try {
                const stats = await fs.stat(filePath);
                const fileName = path.basename(filePath);
                const sizeMB = stats.size / 1024 / 1024;
                
                console.log(`  Removing: ${fileName} (${getFileAgeDays(filePath, stats)} days old, ${sizeMB.toFixed(2)}MB)`);
                await fs.unlink(filePath);
                cleanedCount++;
                cleanedSize += sizeMB;
                
                // Small delay to prevent overwhelming the system
                if (cleanedCount % 10 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            } catch (error) {
                console.warn(`  Could not remove ${filePath}: ${error.message}`);
            }
        }
    } catch (error) {
        console.warn(`Find command failed: ${error.message}`);
        return { cleaned: 0, size: 0 };
    }
    
    console.log(`  ✅ Removed ${cleanedCount} files (${cleanedSize.toFixed(2)}MB freed)`);
    return { cleaned: cleanedCount, size: cleanedSize };
}

/**
 * Clean up all files in temp directory
 */
async function cleanupTempFiles() {
    if (!existsSync(TEMP_DIR)) {
        console.log(`Temp directory ${TEMP_DIR} does not exist, skipping...`);
        return { cleaned: 0, size: 0 };
    }

    console.log(`\n🧹 Cleaning all temp files in ${TEMP_DIR}`);
    
    const files = await fs.readdir(TEMP_DIR);
    let cleanedCount = 0;
    let cleanedSize = 0;
    
    for (const file of files) {
        const filePath = path.join(TEMP_DIR, file);
        const stats = await fs.stat(filePath);
        
        if (stats.isFile()) {
            console.log(`  Removing: ${file} (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);
            await fs.unlink(filePath);
            cleanedCount++;
            cleanedSize += stats.size / 1024 / 1024;
        }
    }
    
    console.log(`  ✅ Removed ${cleanedCount} temp files (${cleanedSize.toFixed(2)}MB freed)`);
    return { cleaned: cleanedCount, size: cleanedSize };
}

/**
 * Clean downloads if they exceed size limit (memory-efficient)
 */
async function cleanupDownloadsBySize() {
    if (!existsSync(DOWNLOADS_DIR)) return { cleaned: 0, size: 0 };
    
    const currentSize = await getDirectorySize(DOWNLOADS_DIR);
    console.log(`\n📁 Downloads directory size: ${currentSize}MB`);
    
    if (currentSize <= config.maxDownloadStorageMB) {
        console.log(`  ✅ Within size limit (${config.maxDownloadStorageMB}MB)`);
        return { cleaned: 0, size: 0 };
    }
    
    console.log(`  ⚠️  Exceeds size limit! Removing oldest files...`);
    
    try {
        // Use ls command sorted by time for memory efficiency
        const { exec } = await import('child_process');
        const { promisify } = await import('util');
        const execAsync = promisify(exec);
        
        // Get files sorted by modification time (oldest first)
        const { stdout } = await execAsync(`ls -1t "${DOWNLOADS_DIR}" 2>/dev/null | tac || true`);
        const files = stdout.split('\n').filter(f => f.length > 0);
        
        let cleanedCount = 0;
        let cleanedSize = 0;
        let remainingSize = currentSize;
        
        for (const fileName of files) {
            if (remainingSize <= config.maxDownloadStorageMB) break;
            
            const filePath = path.join(DOWNLOADS_DIR, fileName);
            try {
                const stats = await fs.stat(filePath);
                const sizeMB = stats.size / 1024 / 1024;
                
                console.log(`  Removing: ${fileName} (${sizeMB.toFixed(2)}MB)`);
                await fs.unlink(filePath);
                cleanedCount++;
                cleanedSize += sizeMB;
                remainingSize -= sizeMB;
                
                // Small delay every few files
                if (cleanedCount % 5 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            } catch (error) {
                console.warn(`  Could not remove ${fileName}: ${error.message}`);
            }
        }
        
        console.log(`  ✅ Removed ${cleanedCount} files (${cleanedSize.toFixed(2)}MB freed)`);
        return { cleaned: cleanedCount, size: cleanedSize };
    } catch (error) {
        console.warn(`Size cleanup failed: ${error.message}`);
        return { cleaned: 0, size: 0 };
    }
}

/**
 * Rotate log files
 */
async function rotateLogFiles() {
    const logFiles = ['process.log', 'error.log'];
    let rotatedCount = 0;
    let rotatedSize = 0;
    
    console.log(`\n📋 Rotating log files...`);
    
    for (const logFile of logFiles) {
        const logPath = path.join(LOGS_DIR, logFile);
        
        if (!existsSync(logPath)) continue;
        
        const stats = await fs.stat(logPath);
        const sizeMB = stats.size / 1024 / 1024;
        
        // Rotate if file is larger than 50MB
        if (sizeMB > 50) {
            const timestamp = new Date().toISOString().split('T')[0];
            const rotatedPath = path.join(LOGS_DIR, `${logFile}.${timestamp}`);
            
            console.log(`  Rotating: ${logFile} (${sizeMB.toFixed(2)}MB) -> ${path.basename(rotatedPath)}`);
            await fs.rename(logPath, rotatedPath);
            
            // Create new empty log file
            await fs.writeFile(logPath, '');
            
            rotatedCount++;
            rotatedSize += sizeMB;
        }
    }
    
    console.log(`  ✅ Rotated ${rotatedCount} log files (${rotatedSize.toFixed(2)}MB)`);
    return { rotated: rotatedCount, size: rotatedSize };
}

/**
 * Main cleanup function
 */
async function cleanup() {
    console.log('🧽 Starting storage cleanup...');
    console.log(`📊 Current project size: ${(await getDirectorySize(PROJECT_DIR)).toFixed(2)}MB`);
    
    let totalCleaned = 0;
    let totalSize = 0;
    
    try {
        // Clean temp files
        if (config.cleanTempFiles) {
            const tempResult = await cleanupTempFiles();
            totalCleaned += tempResult.cleaned;
            totalSize += tempResult.size;
        }
        
        // Clean old downloaded PDFs
        const downloadResult = await cleanupOldFiles(
            DOWNLOADS_DIR, 
            config.downloadRetentionDays, 
            /\.pdf$/i
        );
        totalCleaned += downloadResult.cleaned;
        totalSize += downloadResult.size;
        
        // Clean downloads by size if needed
        const sizeResult = await cleanupDownloadsBySize();
        totalCleaned += sizeResult.cleaned;
        totalSize += sizeResult.size;
        
        // Clean old logs
        const logResult = await cleanupOldFiles(
            LOGS_DIR, 
            config.logRetentionDays, 
            /\.log/
        );
        totalCleaned += logResult.cleaned;
        totalSize += logResult.size;
        
        // Rotate large log files
        const rotateResult = await rotateLogFiles();
        
        console.log(`\n✨ Cleanup completed!`);
        console.log(`📁 Final project size: ${(await getDirectorySize(PROJECT_DIR)).toFixed(2)}MB`);
        console.log(`🗑️  Total files cleaned: ${totalCleaned}`);
        console.log(`💾 Total space freed: ${totalSize.toFixed(2)}MB`);
        console.log(`📋 Log files rotated: ${rotateResult.rotated}`);
        
    } catch (error) {
        console.error('❌ Cleanup failed:', error);
        process.exit(1);
    }
}

// Run cleanup if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    cleanup();
}

export default cleanup;
