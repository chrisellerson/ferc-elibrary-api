[**ferc-elibrary-api**](../README.md) • **Docs**

***

[ferc-elibrary-api](../globals.md) / GeneralSearchParams

# Type alias: GeneralSearchParams

> **GeneralSearchParams**: `object`

Search params for an eLibrary General Search
https://elibrary.ferc.gov/eLibrary/search

## Type declaration

### accessionNumber?

> `optional` **accessionNumber**: `string` \| `null`

### affiliations

> **affiliations**: [`Affiliations`](../namespaces/Stubs/type-aliases/Affiliations.md)[]

### allDates

> **allDates**: `boolean`

### availability

> **availability**: [`SecurityLevel`](../namespaces/Stubs/type-aliases/SecurityLevel.md)[] \| `null`

### categories

> **categories**: [`Categories`](../namespaces/Stubs/type-aliases/Categories.md)[]

### classTypes

> **classTypes**: [`ClassType`](../namespaces/Stubs/type-aliases/ClassType.md)[]

### curPage

> **curPage**: `number`

### dateSearches

> **dateSearches**: `DateSearch`[]

### docketSearches

> **docketSearches**: `DocketSearch`[]

### eFiling

> **eFiling**: `boolean`

### fedCourtCaseNumber?

> `optional` **fedCourtCaseNumber**: `string`

### fedRegisterCite?

> `optional` **fedRegisterCite**: `string`

### fercCite?

> `optional` **fercCite**: `string`

### groupBy

> **groupBy**: `string`

### idolResultID

> **idolResultID**: `string`

### libraries

> **libraries**: [`Libraries`](../namespaces/Stubs/type-aliases/Libraries.md)[]

### opinion?

> `optional` **opinion**: `string`

### orderNumber?

> `optional` **orderNumber**: `string`

### parentAccessionNumber?

> `optional` **parentAccessionNumber**: `string`

### resultsPerPage

> **resultsPerPage**: `number`

Number of results to return per page.

### searchDescription

> **searchDescription**: `boolean`

### searchFullText

> **searchFullText**: `boolean`

### searchText

> **searchText**: `string`

### sortBy

> **sortBy**: `string`

## Source

[types/GeneralSearch.ts:27](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/types/GeneralSearch.ts#L27)
