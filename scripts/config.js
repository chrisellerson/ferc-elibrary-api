import dotenv from 'dotenv';
dotenv.config();

export default {
    email: {
        clientId: process.env.AZURE_CLIENT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
        tenantId: process.env.AZURE_TENANT_ID,
        sharedMailbox: process.env.SHARED_MAILBOX_ADDRESS,
        recipients: process.env.NOTIFICATION_RECIPIENTS
    },
    downloads: {
        directory: 'downloads'
    }
}; 