[**ferc-elibrary-api**](../README.md) • **Docs**

***

[ferc-elibrary-api](../globals.md) / GeneralSearch

# Class: GeneralSearch

## Extends

- `Search`\<[`GeneralSearchParams`](../type-aliases/GeneralSearchParams.md), [`GeneralSearchResult`](../type-aliases/GeneralSearchResult.md)\>

## Constructors

### new GeneralSearch()

> **new GeneralSearch**(`params`): [`GeneralSearch`](GeneralSearch.md)

#### Parameters

• **params**: `Partial`\<[`GeneralSearchParams`](../type-aliases/GeneralSearchParams.md)\>

#### Returns

[`GeneralSearch`](GeneralSearch.md)

#### Overrides

`Search<GeneralSearchParams, GeneralSearchResult>.constructor`

#### Source

[search/general.ts:36](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/general.ts#L36)

## Properties

### data

> **data**: `undefined` \| [`GeneralSearchResult`](../type-aliases/GeneralSearchResult.md)

#### Inherited from

`Search.data`

#### Source

[search/search.ts:8](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/search.ts#L8)

***

### defaultParams

> `readonly` **defaultParams**: [`GeneralSearchParams`](../type-aliases/GeneralSearchParams.md) = `defaultSearch`

#### Overrides

`Search.defaultParams`

#### Source

[search/general.ts:33](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/general.ts#L33)

***

### fetch()

> `readonly` **fetch**: (`params`) => `Promise`\<[`GeneralSearchResult`](../type-aliases/GeneralSearchResult.md)\>

#### Parameters

• **params**: [`GeneralSearchParams`](../type-aliases/GeneralSearchParams.md)

#### Returns

`Promise`\<[`GeneralSearchResult`](../type-aliases/GeneralSearchResult.md)\>

#### Overrides

`Search.fetch`

#### Source

[search/general.ts:34](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/general.ts#L34)

***

### params

> **params**: [`GeneralSearchParams`](../type-aliases/GeneralSearchParams.md)

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

[search/general.ts:42](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/general.ts#L42)

***

### nextPage()

> **nextPage**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Source

[search/general.ts:50](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/general.ts#L50)

***

### prevPage()

> **prevPage**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Source

[search/general.ts:60](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/general.ts#L60)

***

### updateParams()

> **updateParams**(`params`): `void`

#### Parameters

• **params**: `Partial`\<[`GeneralSearch`](GeneralSearch.md)\>

#### Returns

`void`

#### Source

[search/general.ts:46](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/general.ts#L46)
