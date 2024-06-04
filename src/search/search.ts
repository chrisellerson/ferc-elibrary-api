export abstract class Search<
  SearchParams extends Record<string, unknown>,
  SearchResults extends Record<string, unknown>
> {
  params: SearchParams = {} as SearchParams
  abstract defaultParams: SearchParams

  data: SearchResults | undefined
  abstract readonly fetch: (params: SearchParams) => Promise<SearchResults>
}
