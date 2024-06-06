export function fetchFunction<SearchParams, SearchResults>(
  searchType: string, method = "post"
): (params: SearchParams) => Promise<SearchResults> {
  return async (params: SearchParams) => {
    console.log(`https://elibrary.ferc.gov/eLibrarywebapi/api/${searchType}`)
    return fetch(`https://elibrary.ferc.gov/eLibrarywebapi/api/${searchType}`, {
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(params),
      method,
    }).then((r) => {
      console.log(r)
      return r.json()
    })
  }
}
