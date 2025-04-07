import { sendEmailNotification } from './notifier.js';
import path from 'path';
import dotenv from 'dotenv';

// Ensure environment variables are reloaded
dotenv.config();

// Mock order data matching our known successful download
const testOrder = {
    acesssionNumber: '20250402-3057',
    docketNumbers: ['CP23-516'],
    description: 'Order Issuing Certificate re East Tennessee Natural Gas, LLC under CP23-516',
    filedDate: '2025-04-02'
};

// Path to our known downloaded PDF
const testFilePath = path.join(process.cwd(), 'downloads', '20250402-3057.pdf');

async function testEmailNotification() {
    console.log('=== Starting Email Notification Test ===');
    console.log('Test Configuration:');
    console.log('- Order:', testOrder);
    console.log('- PDF path:', testFilePath);

    try {
        console.log('\nAttempting to send email...');
        const result = await sendEmailNotification(testOrder, testFilePath);
        console.log('\nEmail sent successfully!');
        console.log('Result:', result);
    } catch (error) {
        console.error('\nFailed to send email notification:');
        console.error(error);
        process.exit(1);
    }
}

// Run the test
console.log('Starting email test...');
testEmailNotification()
    .then(() => {
        console.log('\nTest completed successfully');
        process.exit(0);
    })
    .catch(error => {
        console.error('\nTest failed:', error);
        process.exit(1);
    }); 