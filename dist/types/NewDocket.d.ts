export type NewDocketParams = {
    by: 'rbFilingDate' | 'rbCreateDate';
    start: string;
    end: string;
};
export type NewDocketResults = {
    DataList: {
        DocketID: number;
        DocketShortNumber: string;
        SubDocketNumber: string;
        DocketFullNumber: string;
        DocketCreationDate: string;
        DocketFilingDate: string;
        DocketDescription: string;
        CommaDelimitedApplicantsList: string;
        DocketSheetlink: string;
    }[];
    ErrorList: unknown[];
};
