import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function initDB() {
    // Open DB with sqlite wrapper for better async support
    const db = await open({
        filename: 'orders.db',
        driver: sqlite3.Database
    });

    // Create table for tracking orders
    await db.exec(`
        CREATE TABLE IF NOT EXISTS processed_orders (
            accession_number TEXT PRIMARY KEY,
            docket_number TEXT NOT NULL,
            retrieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            file_path TEXT,
            email_sent BOOLEAN DEFAULT 0
        )
    `);

    return db;
}

export async function isOrderProcessed(accessionNumber) {
    const db = await initDB();
    const result = await db.get(
        'SELECT * FROM processed_orders WHERE accession_number = ?',
        [accessionNumber]
    );
    return !!result;
}

export async function markOrderProcessed(order, filePath) {
    const db = await initDB();
    await db.run(
        `INSERT INTO processed_orders 
         (accession_number, docket_number, file_path) 
         VALUES (?, ?, ?)`,
        [order.accessionNumber, order.docketNumbers[0], filePath]
    );
}

// Test the DB setup if running directly
if (process.argv[1] === import.meta.url) {
    console.log('Testing database setup...');
    initDB()
        .then(db => {
            console.log('Database initialized successfully');
            db.close();
        })
        .catch(error => {
            console.error('Database initialization failed:', error);
            process.exit(1);
        });
}

export default initDB; 