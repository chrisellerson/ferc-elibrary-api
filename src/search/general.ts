import type { GeneralSearchParams, GeneralSearchResult } from "~/types";
import { Search } from "./search";
import { fetchFunction } from "~/util/fetch";

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
  curPage: 1,
  classTypes: [],
  sortBy: '',
  groupBy: 'NONE',
  idolResultID: '',
  allDates: false,
}


export default class GeneralSearch extends Search<GeneralSearchParams, GeneralSearchResult> {
  readonly defaultParams = defaultSearch
  readonly fetch = fetchFunction<GeneralSearchParams, GeneralSearchResult>("Search/AdvancedSearch")

  constructor(params: Partial<GeneralSearchParams>) {
    super()
    this.params = { ...this.defaultParams, ...params }
    if (this.params.curPage === 0) this.params.curPage = 1
  }

  async getData() {
    this.data = await this.fetch(this.params)
  }

  updateParams(params: Partial<GeneralSearch>) {
    this.params = { ...defaultSearch, ...params }
  }

  async nextPage(): Promise<boolean> {
    const { resultsPerPage, curPage } = this.params
    if ((this.data?.totalHits ?? -1) > (resultsPerPage * (curPage))) {
      this.params.curPage++
      await this.getData()
      return true
    }
    return false
  }

  async prevPage(): Promise<boolean> {
    const { curPage } = this.params
    if (curPage > 1) {
      this.params.curPage--
      await this.getData()
      return true
    }
    return false
  }
}
