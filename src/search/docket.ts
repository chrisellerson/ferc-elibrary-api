import type { DocketSearchParams, DocketSearchResults } from "~/types/DocketSearch";
import { Search } from "./search";
import { fetchFunction } from "~/util/fetch";

const defaultSearch: DocketSearchParams = {
  "dockets": "rp24-769",
  "subdockets": "000",
  "filed_date_beg": "01-01-1960",
  "filed_date_end": "06-04-2024",
  "complete_flag": 0,
  "numHits": 100,
  "pageNumber": 0
}

export default class DocketSearch extends Search<DocketSearchParams, DocketSearchResults> {

  readonly defaultParams = defaultSearch
  readonly fetch = fetchFunction<DocketSearchParams, DocketSearchResults>("Docket/GetSingleDocketSheet")

  constructor(params: Partial<DocketSearchParams>) {
    super()
    this.params = { ...this.defaultParams, ...params }
  }

  async getData() {
    this.data = await this.fetch(this.params)
  }

  updateParams(params: Partial<DocketSearchParams>) {
    this.params = { ...defaultSearch, ...params }
  }

  async nextPage(): Promise<boolean> {
    const { numHits: resultsPerPage, pageNumber: curPage } = this.params
    if ((this.data?.Page.totalHits ?? -1) > (resultsPerPage * (curPage+1))) {
      this.params.pageNumber++
      await this.getData()
      return true
    }
    return false
  }

  async prevPage(): Promise<boolean> {
    const { pageNumber: curPage } = this.params
    if (curPage > 0) {
      this.params.pageNumber--
      await this.getData()
      return true
    }
    return false
  }




}
