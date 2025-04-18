// Basic test script to verify execution
console.log('Script starting...');

import fetch from 'node-fetch';  // Make sure this is installed
import fs from 'fs/promises';
import path from 'path';

console.log('Import completed');

/**
 * @typedef {Object} OrderInfo
 * @property {string} acesssionNumber - Note: misspelled in API
 * @property {string[]} docketNumbers
 * @property {string} description
 * @property {string} filedDate
 */

/**
 * Downloads a PDF for the given order
 * @param {string} accessionNumber - The accession number from the search results
 * @returns {Promise<string>} Path to the downloaded file
 */
async function downloadOrderPDF(accessionNumber) {
    console.log(`Starting download for accession number: ${accessionNumber}`);
    
    const url = `https://elibrary.ferc.gov/eLibraryWebAPI/api/File/DownloadPDF?accesssionNumber=${accessionNumber}`;
    console.log('Requesting URL:', url);
    
    try {
        console.log('Sending request...');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9',
                'content-type': 'application/json',
                'origin': 'https://elibrary.ferc.gov',
                'referer': 'https://elibrary.ferc.gov/eLibrary/search'
            },
            body: JSON.stringify({
                accesssionNumber: accessionNumber
            })
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Ensure downloads directory exists
        const downloadDir = path.join(process.cwd(), 'downloads');
        await fs.mkdir(downloadDir, { recursive: true });

        // Save the PDF
        const filepath = path.join(downloadDir, `${accessionNumber}.pdf`);
        const buffer = await response.arrayBuffer();
        await fs.writeFile(filepath, Buffer.from(buffer));

        console.log(`Successfully downloaded: ${filepath}`);
        console.log(`File size: ${buffer.byteLength} bytes`);
        
        return filepath;

    } catch (error) {
        console.error('Download failed:', error);
        console.error('Error details:', error.message);
        throw error;
    }
}

// Remove any test execution code and just export the function
export { downloadOrderPDF };

console.log('\nScript completed'); 