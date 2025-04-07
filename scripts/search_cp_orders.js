import { GeneralSearch } from '../dist/index.js';
import dayjs from 'dayjs';

async function findNotationalOrders() {
    console.log('Starting search...');  // Basic check that function is running

    const endDate = dayjs();
    const startDate = endDate.subtract(24, 'hour');

    const searchParams = {
        searchText: '*',
        searchFullText: true,
        searchDescription: true,
        dateSearches: [{
            dateType: 'filed_date',
            startDate: startDate.format('MM-DD-YYYY'),
            endDate: endDate.format('MM-DD-YYYY')
        }],
        categories: ['Issuance'],
        availability: null,
        affiliations: [],
        libraries: [],
        accessionNumber: null,
        eFiling: false,
        docketSearches: [],
        resultsPerPage: 100,
        curPage: 0,
        classTypes: [],
        sortBy: '',
        groupBy: 'NONE',
        idolResultID: null,
        allDates: false
    };

    console.log('Search parameters:', {
        startDate: searchParams.dateSearches[0].startDate,
        endDate: searchParams.dateSearches[0].endDate
    });

    try {
        console.log('Executing search...');
        const search = new GeneralSearch(searchParams);
        await search.getData();

        console.log('Search completed. Processing results...');

        if (search.data?.searchHits) {
            console.log(`Total documents found: ${search.data.searchHits.length}`);

            const certificateOrders = search.data.searchHits.filter(hit => {
                const hasCPDocket = hit.docketNumbers?.some(docket => docket.startsWith('CP'));
                const isCertificateOrder = hit.description?.includes('Order Issuing Certificate');
                return hasCPDocket && isCertificateOrder;
            });

            console.log(`Certificate Orders found: ${certificateOrders.length}`);

            if (certificateOrders.length > 0) {
                certificateOrders.forEach(order => {
                    console.log('\n-------------------');
                    console.log('Accession Number:', order.acesssionNumber);
                    console.log('Docket Numbers:', order.docketNumbers?.join(', '));
                    console.log('Description:', order.description);
                    console.log('Filed Date:', order.filedDate);
                });
            }

            return certificateOrders;
        } else {
            console.log('No searchHits in response');
            return [];
        }
    } catch (error) {
        console.error('Error during search:', error);
        throw error;  // Re-throw to be caught by the main execution
    }
}

// Immediately execute the function
console.log('Script started');
findNotationalOrders()
    .then(orders => {
        console.log('Search completed successfully');
        process.exit(0);
    })
    .catch(error => {
        console.error('Script failed:', error);
        process.exit(1);
    });

// Export for use in other modules
export default findNotationalOrders; 