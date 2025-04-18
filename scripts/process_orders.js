import findNotationalOrders from './search_cp_orders.js';
import { downloadOrderPDF } from './download_order.js';
import { isOrderProcessed, markOrderProcessed } from './db_init.js';
import { sendEmailNotification } from './notifier.js';
import path from 'path';

async function processNewOrders() {
    console.log('=== Starting FERC Order Processing ===');
    
    try {
        // Step 1: Search for new orders
        console.log('\n1. Searching for new CP Certificate Orders...');
        const newOrders = await findNotationalOrders();
        console.log(`Found ${newOrders.length} orders to process`);

        if (newOrders.length === 0) {
            console.log('No new orders found to process');
            return true;
        }

        // Step 2: Process each order
        for (const order of newOrders) {
            console.log(`\n=== Processing order: ${order.acesssionNumber} ===`);
            
            try {
                // Check if already processed
                console.log('Checking if order was previously processed...');
                if (await isOrderProcessed(order.acesssionNumber)) {
                    console.log('Order already processed, skipping...');
                    continue;
                }

                // Download the PDF
                console.log('\n2. Downloading PDF...');
                const filepath = await downloadOrderPDF(order.acesssionNumber);
                console.log('Download completed:', filepath);
                
                // Record in database
                console.log('\n3. Recording in database...');
                await markOrderProcessed(order, filepath);
                console.log('Database record created');

                // Send email notification
                console.log('\n4. Sending email notification...');
                await sendEmailNotification(order, filepath);
                console.log('Email notification sent');

                console.log('\n=== Order processed successfully ===');
            } catch (error) {
                console.error(`\nError processing order ${order.acesssionNumber}:`);
                console.error('Error details:', error.message);
                continue;
            }
        }

        console.log('\n=== All orders processed ===');
        return true;

    } catch (error) {
        console.error('\nError in order processing:', error);
        throw error;
    }
}

// Immediately execute the function
console.log('Starting order processing script...');
processNewOrders()
    .then(() => {
        console.log('\nProcessing completed successfully');
        process.exit(0);
    })
    .catch(error => {
        console.error('\nProcessing failed:', error);
        process.exit(1);
    });

export default processNewOrders; 