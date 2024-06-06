import { NewDocketParams, NewDocketResults } from '../types/NewDocket';
import { Search } from './search';

export default class NewDocketSearch extends Search<NewDocketParams, NewDocketResults> {
    readonly defaultParams: NewDocketParams;
    fetch: (params: {}) => Promise<NewDocketResults>;
    constructor(params: Partial<NewDocketParams>);
    setFetch(): void;
    getData(): Promise<void>;
    updateParams(params: Partial<NewDocketParams>): void;
}
