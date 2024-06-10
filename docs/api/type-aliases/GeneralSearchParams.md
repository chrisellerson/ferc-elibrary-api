[ferc-elibrary-api](../globals.md) / GeneralSearchParams

# Type alias: GeneralSearchParams

> **GeneralSearchParams**: `object`

Search params for an eLibrary General Search
https://elibrary.ferc.gov/eLibrary/search

## Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `accessionNumber` | `string` \| `null` | - |
| `affiliations` | [`Affiliations`](../namespaces/Stubs/type-aliases/Affiliations.md)[] | - |
| `allDates` | `boolean` | - |
| `availability` | [`SecurityLevel`](../namespaces/Stubs/type-aliases/SecurityLevel.md)[] \| `null` | - |
| `categories` | [`Categories`](../namespaces/Stubs/type-aliases/Categories.md)[] | - |
| `classTypes` | [`ClassType`](../namespaces/Stubs/type-aliases/ClassType.md)[] | - |
| `curPage` | `number` | - |
| `dateSearches` | `DateSearch`[] | - |
| `docketSearches` | `DocketSearch`[] | - |
| `eFiling` | `boolean` | - |
| `fedCourtCaseNumber` | `string` | - |
| `fedRegisterCite` | `string` | - |
| `fercCite` | `string` | - |
| `groupBy` | `string` | - |
| `idolResultID` | `string` | - |
| `libraries` | [`Libraries`](../namespaces/Stubs/type-aliases/Libraries.md)[] | - |
| `opinion` | `string` | - |
| `orderNumber` | `string` | - |
| `parentAccessionNumber` | `string` | - |
| `resultsPerPage` | `number` | Number of results to return per page. |
| `searchDescription` | `boolean` | - |
| `searchFullText` | `boolean` | - |
| `searchText` | `string` | - |
| `sortBy` | `string` | - |

## Source

[types/GeneralSearch.ts:27](https://github.com/4very/ferc-elibrary-api/blob/5fca0cdab67bbed141a6d8d56056f02bebe7f172/src/types/GeneralSearch.ts#L27)
