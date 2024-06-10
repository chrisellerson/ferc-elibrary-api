import { GeneralSearchParams } from '~/types'

export const EMPTY_GENERAL_SEARCH = {
  searchHits: [],
  totalHits: 0,
  numHits: 0,
  success: true,
  errorMessage: null,
  searchResultId: null,
}

export const SINGLE_GENERAL_SEARCH = {
  searchHits: [
    {
      reference:
        '{3A5C0B7A-70F0-CA30-9529-772417200000}-{020AAB97-66E2-5005-8110-C31FAFC91712}',
      documentId: '3A5C0B7A-70F0-CA30-9529-772417200000',
      description:
        'Application for Preliminary Permit for Document of Premium Energy Holdings, LLC Ashokan PSP under P-15056.',
      summary: null,
      category: 'Submittal',
      acesssionNumber: '20201119-5202',
      issuedDate: '11/18/2020',
      filedDate: '11/19/2020',
      postedDate: '11/20/2020',
      classTypes: [
        {
          documentClass: 'Application/Petition/Request',
          documentType: 'Application for Preliminary Permit',
        },
      ],
      availCode: 'P',
      familyValue: 'none',
      libraries: ['Hydro'],
      score: 85.35,
      docketNumbers: ['P-15056-000'],
      transmittals: [
        {
          fileId: '020AAB97-66E2-5005-8110-C31FAFC91712',
          fileType: 'PDF',
          fileFormat: 'PDF',
          fileName: 'Premium Energy Preliminary Permit App Ashokan PSP.PDF',
          fileDesc: 'Application for Preliminary Permit for Ashokan PSP',
          fileSize: 472488,
          transmittalFk: null,
        },
      ],
      affiliations: [
        {
          afType: 'AUTHOR',
          affiliation: 'Premium Energy Holdings, LLC',
          lastName: 'Rojas',
          firstInitial: 'V',
          middleInitial: 'M',
        },
        {
          afType: 'RECIPIENT',
          affiliation: 'Office of the Secretary, FERC',
          lastName: 'Bose',
          firstInitial: 'K',
          middleInitial: 'D',
        },
        {
          afType: 'AGENT',
          affiliation: 'No Organization Found',
          lastName: 'Rojas',
          firstInitial: 'V',
          middleInitial: 'M',
        },
      ],
    },
  ],
  totalHits: 1,
  numHits: 1,
  success: true,
  errorMessage: null,
  searchResultId: null,
}

export const NULL_SEARCH_RESULT = {
  searchHits: null,
  totalHits: 0,
  numHits: 0,
  success: false,
  errorMessage: null,
  searchResultId: null,
}

export const SINGLE_PAGE_SEARCH_PARAMS: GeneralSearchParams = {
  searchText: '*',
  searchFullText: true,
  searchDescription: true,
  dateSearches: [
    {
      dateType: 'filed_date',
      startDate: '2020-11-19',
      endDate: '2020-12-16',
    },
  ],
  availability: null,
  affiliations: [],
  categories: [],
  libraries: [],
  accessionNumber: null,
  eFiling: false,
  docketSearches: [
    {
      docketNumber: 'P-15056-000',
      subDocketNumbers: [],
    },
  ],
  resultsPerPage: 1,
  classTypes: [],
  sortBy: '',
  groupBy: 'NONE',
  idolResultID: '',
  allDates: false,
  curPage: 0,
}
