import { DocketSearchParams, DocketSearchResults } from '../types/DocketSearch';
import { Search } from './search';

export default class DocketSearch extends Search<DocketSearchParams, DocketSearchResults> {
    readonly defaultParams: DocketSearchParams;
    readonly fetch: (params: DocketSearchParams) => Promise<DocketSearchResults>;
    constructor(params: Partial<DocketSearchParams>);
    getData(): Promise<void>;
    updateParams(params: Partial<DocketSearchParams>): void;
    nextPage(): Promise<boolean>;
    prevPage(): Promise<boolean>;
}
