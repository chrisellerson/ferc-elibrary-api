import {
  ClassType,
  Affiliations,
  SecurityLevel,
  Categories,
  Libraries,
} from './stubs'

export type DocketSearch = {
  docketNumber: string | null
  subDocketNumbers: string[] | null
}
export type DateSearch = {
  dateType: 'issued_date' | 'filed_date' | 'posted_date'
  startDate: string
  endDate: string
}

// TODO document all types
export type GeneralSearchParams = {
  // ways to search
  docketSearches: DocketSearch[]
  accessionNumber?: string | null
  parentAccessionNumber?: string
  fedRegisterCite?: string
  fedCourtCaseNumber?: string
  fercCite?: string
  opinion?: string
  orderNumber?: string

  searchText: string
  searchFullText: boolean
  searchDescription: boolean

  allDates: boolean
  dateSearches: DateSearch[]

  // filtering
  classTypes: ClassType[]
  affiliations: Affiliations[]
  availability: SecurityLevel[] | null
  categories: Categories[]
  libraries: Libraries[]
  eFiling: boolean

  // displaying
  sortBy: string
  groupBy: string // TODO Check if this does anything
  /**
   * Number of results to return per page.
   * @type {number}
   */
  resultsPerPage: number
  curPage: number

  idolResultID: string // TODO Find out what this does
}

export type Transmittal = {
  fileId: string
  fileType: string
  fileFormat: string
  fileName: string
  fileDesc: string
  fileSize: number
  transmittalFk: null
}

export type GeneralSearchResult = {
  errorMessage: unknown
  numHits: number
  searchResultId: unknown
  success: boolean
  totalHits: number
  searchHits: {
    reference: string
    documentId: string
    acesssionNumber: string // NOTE this is misspelled
    docketNumbers: string[]

    description: string
    summary: null
    familyValue: 'None' | 'none' | 'child' | 'Parent' // TODO find what this does

    issuedDate: string
    filedDate: string
    postedDate: string

    category: Categories
    classTypes: ClassType[]
    availCode: SecurityLevel
    libraries: Libraries[]
    transmittals: Transmittal[]
    affiliations: Affiliations[]

    // TODO 0 idea what this does lol
    score: 83.35
  }[]
}
