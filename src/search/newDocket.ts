import { NewDocketParams, NewDocketResults } from '~/types/NewDocket'
import { Search } from './search'
import { fetchFunction } from '~/util/fetch'

const defaultSearch: NewDocketParams = {
  by: 'rbFilingDate',
  start: '06-04-2024',
  end: '06-04-2024',
}

export default class NewDocketSearch extends Search<
  NewDocketParams,
  NewDocketResults
> {
  readonly defaultParams = defaultSearch
  fetch = fetchFunction<{}, NewDocketResults>('')

  constructor(params: Partial<NewDocketParams>) {
    super()
    this.params = { ...this.defaultParams, ...params }
    this.setFetch()
  }

  setFetch() {
    this.fetch = fetchFunction<{}, NewDocketResults>(
      `Docket/GetATMSdocs/${this.params.by}/${this.params.start}/${this.params.end}/DocketFullNumber`,
      'get'
    )
  }

  async getData() {
    this.data = await this.fetch({})
  }

  updateParams(params: Partial<NewDocketParams>) {
    this.params = { ...defaultSearch, ...params }
    this.setFetch()
  }
}
