import { GeneralSearchParams, GeneralSearchResult } from '../types';
import { Search } from './search';

export default class GeneralSearch extends Search<GeneralSearchParams, GeneralSearchResult> {
    readonly defaultParams: GeneralSearchParams;
    readonly fetch: (params: GeneralSearchParams) => Promise<GeneralSearchResult>;
    constructor(params: Partial<GeneralSearchParams>);
    getData(): Promise<void>;
    updateParams(params: Partial<GeneralSearch>): void;
    nextPage(): Promise<boolean>;
    prevPage(): Promise<boolean>;
}
