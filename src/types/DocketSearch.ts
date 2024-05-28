import { Categories } from './stubs'

export type DocketSearchParams = {
  dockets: string
  subdockets: 'All' | string // "000,001"

  filed_date_beg: string
  filed_date_end: string

  numHits: number
  pageNumber: number

  complete_flag: 0
}

export type DocketSearchResults = {
  Page: {
    totalHits: number
    numHits: number
    pageNumber: number
  }
  ErrorList: unknown[]
  DataList: {
    DocumentsItem: {
      document_id: 0
      category_cd: 0

      DOCKET_TEXT: string
      SUBDOCKET_TEXT: string
      DOCKET_CODE: null
      subDocketNumber: 0

      accession_no: string
      accession_date: string
      accession_series: null
      availability_code: null

      category: Categories

      doc_desc: string

      source: null

      Affiliation_Organization: string[]
      fed_reg_num: null

      filed_date: string
      issued_date: string
      fed_reg_date: string
      comments_due_date: string

      FEE_AMT_CUR: 0
      FERC_CITE: null
    }[]
    AuthorsItem: []
    FedCitesItem: []
  }[]
}
