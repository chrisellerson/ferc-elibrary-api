export type Libraries = 'General' | 'Electric' | 'Gas' | 'Oil' | 'Rulemaking' | 'Hydro';
export type Categories = 'Issuance' | 'Submittal';
export type SecurityLevel = 'c' | 's' | 'n' | 'p';
export type Affiliations = {
    afType: 'author' | 'agent' | 'recipient';
    affiliation: string;
    firstInitial: string;
    lastName: string;
    middleInitial: string;
};
export type ClassType = {
    documentClass: string;
    documentType: string;
};
