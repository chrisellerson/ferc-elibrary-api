[**ferc-elibrary-api**](../README.md) • **Docs**

***

[ferc-elibrary-api](../globals.md) / DocketSearch

# Class: DocketSearch

## Extends

- `Search`\<[`DocketSearchParams`](../type-aliases/DocketSearchParams.md), [`DocketSearchResults`](../type-aliases/DocketSearchResults.md)\>

## Constructors

### new DocketSearch()

> **new DocketSearch**(`params`): [`DocketSearch`](DocketSearch.md)

#### Parameters

• **params**: `Partial`\<[`DocketSearchParams`](../type-aliases/DocketSearchParams.md)\>

#### Returns

[`DocketSearch`](DocketSearch.md)

#### Overrides

`Search<DocketSearchParams, DocketSearchResults>.constructor`

#### Source

[search/docket.ts:20](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/docket.ts#L20)

## Properties

### data

> **data**: `undefined` \| [`DocketSearchResults`](../type-aliases/DocketSearchResults.md)

#### Inherited from

`Search.data`

#### Source

[search/search.ts:8](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/search.ts#L8)

***

### defaultParams

> `readonly` **defaultParams**: [`DocketSearchParams`](../type-aliases/DocketSearchParams.md) = `defaultSearch`

#### Overrides

`Search.defaultParams`

#### Source

[search/docket.ts:17](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/docket.ts#L17)

***

### fetch()

> `readonly` **fetch**: (`params`) => `Promise`\<[`DocketSearchResults`](../type-aliases/DocketSearchResults.md)\>

#### Parameters

• **params**: [`DocketSearchParams`](../type-aliases/DocketSearchParams.md)

#### Returns

`Promise`\<[`DocketSearchResults`](../type-aliases/DocketSearchResults.md)\>

#### Overrides

`Search.fetch`

#### Source

[search/docket.ts:18](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/docket.ts#L18)

***

### params

> **params**: [`DocketSearchParams`](../type-aliases/DocketSearchParams.md)

#### Inherited from

`Search.params`

#### Source

[search/search.ts:5](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/search.ts#L5)

## Methods

### getData()

> **getData**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

[search/docket.ts:25](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/docket.ts#L25)

***

### nextPage()

> **nextPage**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Source

[search/docket.ts:33](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/docket.ts#L33)

***

### prevPage()

> **prevPage**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Source

[search/docket.ts:43](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/docket.ts#L43)

***

### updateParams()

> **updateParams**(`params`): `void`

#### Parameters

• **params**: `Partial`\<[`DocketSearchParams`](../type-aliases/DocketSearchParams.md)\>

#### Returns

`void`

#### Source

[search/docket.ts:29](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/docket.ts#L29)
