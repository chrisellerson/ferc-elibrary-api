export function fetchFunction<SearchParams, SearchResults>(
  searchType: string,
  method = 'post'
): (params: SearchParams) => Promise<SearchResults> {
  return async (params: SearchParams) => {
    return fetch(`https://elibrary.ferc.gov/eLibrarywebapi/api/${searchType}`, {
      ...{
        headers: {
          'content-type': 'application/json',
        },
        method,
      },
      ...(method !== 'get' ? { body: JSON.stringify(params) } : {}),
    }).then((r) => {
      return r.json()
    })
  }
}
