import { findNotationalOrders } from './search_cp_orders.js';  // Switch back to real search
import { downloadOrderPDF } from './download_order.js';
import { isOrderProcessed, markOrderProcessed } from './db_init.js';
import { sendEmailNotification } from './notifier.js';
import path from 'path';

async function processNewOrders() {
    console.log('Starting order processing...');
    
    try {
        // Step 1: Search for new orders
        console.log('Searching for new CP Certificate Orders...');
        const newOrders = await findNotationalOrders();
        console.log(`Found ${newOrders.length} orders to process`);

        // Step 2: Process each order
        for (const order of newOrders) {
            console.log(`\nProcessing order: ${order.acesssionNumber}`);
            
            // Check if already processed
            if (await isOrderProcessed(order.acesssionNumber)) {
                console.log('Order already processed, skipping...');
                continue;
            }

            try {
                // Download the PDF
                console.log('Downloading PDF...');
                const filepath = await downloadOrderPDF(order.acesssionNumber);
                
                // Record in database
                console.log('Recording in database...');
                await markOrderProcessed(order, filepath);

                // Send email notification
                console.log('Sending email notification...');
                await sendEmailNotification(order, filepath);

                console.log('Order processed successfully');
                console.log('File saved to:', filepath);
            } catch (error) {
                console.error(`Error processing order ${order.acesssionNumber}:`, error);
                console.error('Error details:', error.message);
                continue;
            }
        }

        console.log('\nAll orders processed');
        return true;

    } catch (error) {
        console.error('Error in order processing:', error);
        throw error;
    }
}

// Execute if run directly
if (process.argv[1] === import.meta.url) {
    processNewOrders()
        .then(() => {
            console.log('Processing completed successfully');
            process.exit(0);
        })
        .catch(error => {
            console.error('Processing failed:', error);
            process.exit(1);
        });
}

export default processNewOrders; 