import type { GeneralSearchParams, GeneralSearchResult } from "~/types";

const defaultSearch: GeneralSearchParams = {
  searchText: '*',
  searchFullText: true,
  searchDescription: true,
  dateSearches: [],
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
  resultsPerPage: 100,
  curPage: 0,
  classTypes: [],
  sortBy: '',
  groupBy: 'NONE',
  idolResultID: '',
  allDates: false,
}


export default class GeneralSearch {

  search: GeneralSearchParams
  data: GeneralSearchResult | undefined


  constructor(search: Partial<GeneralSearchParams>){
    this.search = {...defaultSearch, ...search}
  }

  async fetch() {
    const r = await fetch('https://elibrary.ferc.gov/eLibrarywebapi/api/Search/AdvancedSearch', {
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(this.search),
      method: 'post',
    }
  )
  this.data = await (r).json()
  }



  updateSearch(){}
  nextPage() {}
  prevPage() {}
  page() {}
}
