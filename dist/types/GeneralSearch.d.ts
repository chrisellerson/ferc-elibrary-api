import { ClassType, Affiliations, SecurityLevel, Categories, Libraries } from './stubs';

export type DocketSearch = {
    docketNumber: string | null;
    subDocketNumbers: string[] | null;
};
export type DateSearch = {
    dateType: 'issued_date' | 'filed_date' | 'posted_date';
    startDate: string;
    endDate: string;
};
export type GeneralSearchParams = {
    docketSearches: DocketSearch[];
    accessionNumber?: string | null;
    parentAccessionNumber?: string;
    fedRegisterCite?: string;
    fedCourtCaseNumber?: string;
    fercCite?: string;
    opinion?: string;
    orderNumber?: string;
    searchText: string;
    searchFullText: boolean;
    searchDescription: boolean;
    allDates: boolean;
    dateSearches: DateSearch[];
    classTypes: ClassType[];
    affiliations: Affiliations[];
    availability: SecurityLevel[] | null;
    categories: Categories[];
    libraries: Libraries[];
    eFiling: boolean;
    sortBy: string;
    groupBy: string;
    /**
     * Number of results to return per page.
     * @type {number}
     */
    resultsPerPage: number;
    curPage: number;
    idolResultID: string;
};
export type Transmittal = {
    fileId: string;
    fileType: string;
    fileFormat: string;
    fileName: string;
    fileDesc: string;
    fileSize: number;
    transmittalFk: null;
};
export type GeneralSearchResult = {
    errorMessage: unknown;
    numHits: number;
    searchResultId: unknown;
    success: boolean;
    totalHits: number;
    searchHits: {
        reference: string;
        documentId: string;
        acesssionNumber: string;
        docketNumbers: string[];
        description: string;
        summary: null;
        familyValue: 'None' | 'none' | 'child' | 'Parent';
        issuedDate: string;
        filedDate: string;
        postedDate: string;
        category: Categories;
        classTypes: ClassType[];
        availCode: SecurityLevel;
        libraries: Libraries[];
        transmittals: Transmittal[];
        affiliations: Affiliations[];
        score: 83.35;
    }[];
};
