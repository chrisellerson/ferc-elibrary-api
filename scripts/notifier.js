import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { readFileSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Validate required environment variables
function validateConfig() {
    const required = [
        'AZURE_CLIENT_ID',
        'AZURE_CLIENT_SECRET',
        'AZURE_TENANT_ID',
        'SHARED_MAILBOX_ADDRESS',
        'NOTIFICATION_RECIPIENTS'
    ];

    const missing = required.filter(key => !process.env[key]);
    if (missing.length) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    // Log config (without secrets)
    console.log('Email Configuration:');
    console.log('- Client ID:', process.env.AZURE_CLIENT_ID);
    console.log('- Tenant ID:', process.env.AZURE_TENANT_ID);
    console.log('- Shared Mailbox:', process.env.SHARED_MAILBOX_ADDRESS);
    console.log('- Recipients:', process.env.NOTIFICATION_RECIPIENTS);
}

/**
 * @typedef {Object} OrderInfo
 * @property {string} acesssionNumber
 * @property {string[]} docketNumbers
 * @property {string} description
 * @property {string} filedDate
 */

async function sendEmailNotification(order, filepath) {
    console.log('\n=== Starting Email Notification Process ===');
    
    try {
        validateConfig();

        // Initialize the auth provider
        const credential = new ClientSecretCredential(
            process.env.AZURE_TENANT_ID,
            process.env.AZURE_CLIENT_ID,
            process.env.AZURE_CLIENT_SECRET
        );

        // Create Microsoft Graph client
        const client = Client.init({
            authProvider: async (done) => {
                try {
                    const token = await credential.getToken(['https://graph.microsoft.com/.default']);
                    done(null, token.token);
                } catch (error) {
                    done(error, null);
                }
            }
        });

        // Read the PDF file
        const attachment = readFileSync(filepath);
        const base64File = Buffer.from(attachment).toString('base64');

        // Prepare email message
        const message = {
            subject: `New Certificate Order: ${order.docketNumbers[0]}`,
            body: {
                contentType: 'HTML',
                content: `
                    <h2>New Certificate Order Issued</h2>
                    <p><strong>Docket Number:</strong> ${order.docketNumbers[0]}</p>
                    <p><strong>Accession Number:</strong> ${order.acesssionNumber}</p>
                    <p><strong>Filing Date:</strong> ${order.filedDate}</p>
                    <p><strong>Description:</strong> ${order.description}</p>
                    <br>
                    <p>The PDF document is attached to this email.</p>
                `
            },
            toRecipients: process.env.NOTIFICATION_RECIPIENTS.split(',').map(email => ({
                emailAddress: { address: email.trim() }
            })),
            attachments: [
                {
                    '@odata.type': '#microsoft.graph.fileAttachment',
                    name: path.basename(filepath),
                    contentType: 'application/pdf',
                    contentBytes: base64File
                }
            ]
        };

        console.log('Sending email via Microsoft Graph API...');
        
        // Send mail as shared mailbox
        await client.api(`/users/${process.env.SHARED_MAILBOX_ADDRESS}/sendMail`)
            .post({ message });

        console.log('Email sent successfully!');
        
    } catch (error) {
        console.error('\nError in sendEmailNotification:');
        console.error('- Error Name:', error.name);
        console.error('- Error Message:', error.message);
        if (error.response) {
            console.error('- API Response:', error.response);
        }
        throw error;
    }
}

export { sendEmailNotification }; 