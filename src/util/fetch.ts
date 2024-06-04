export function fetchFunction<SearchParams, SearchResults>(
  searchType: string
): (params: SearchParams) => Promise<SearchResults> {
  return async (params: SearchParams) => {
    return fetch(`https://elibrary.ferc.gov/eLibrarywebapi/api/${searchType}`, {
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(params),
      method: 'post',
    }).then((r) => r.json())
  }
}
