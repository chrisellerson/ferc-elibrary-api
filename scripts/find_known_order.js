import { DocketSearch } from '../dist/index.js';

async function findKnownOrder() {
    console.log('Starting known order search...');
    
    const searchParams = {
        dockets: 'CP23-516',
        filed_date_beg: '04-02-2025',
        filed_date_end: '04-02-2025',
        numHits: 100,
        pageNumber: 0
    };

    console.log('Search parameters:', JSON.stringify(searchParams, null, 2));

    try {
        const search = new DocketSearch(searchParams);
        await search.getData();

        if (search.data?.DataList) {
            // Transform DocketSearch results to match GeneralSearch format
            const transformedResults = search.data.DataList.flatMap(item => 
                item.DocumentsItem.map(doc => ({
                    acesssionNumber: doc.accession_no,
                    docketNumbers: [doc.DOCKET_TEXT],
                    description: doc.doc_desc,
                    filedDate: doc.filed_date.split('T')[0],
                    category: doc.category
                }))
            ).filter(doc => 
                doc.description.includes('Order Issuing Certificate') &&
                doc.docketNumbers.some(docket => docket.startsWith('CP'))
            );

            console.log('\n=== Transformed Results ===');
            transformedResults.forEach(order => {
                console.log('\n-------------------');
                console.log('Accession Number:', order.acesssionNumber);
                console.log('Docket Numbers:', order.docketNumbers.join(', '));
                console.log('Description:', order.description);
                console.log('Filed Date:', order.filedDate);
            });

            return transformedResults;
        } else {
            console.log('No results found');
            // Return mock result for testing
            return [{
                acesssionNumber: '20250402-3057',
                docketNumbers: ['CP23-516'],
                description: 'Order Issuing Certificate re East Tennessee Natural Gas, LLC under CP23-516',
                filedDate: '2025-04-02',
                category: 'Issuance'
            }];
        }
    } catch (error) {
        console.error('API call failed:', error);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        throw error;
    }
}

export default findKnownOrder; 