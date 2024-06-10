[**ferc-elibrary-api**](../README.md) • **Docs**

***

[ferc-elibrary-api](../globals.md) / NewDocketSearch

# Class: NewDocketSearch

## Extends

- `Search`\<[`NewDocketParams`](../type-aliases/NewDocketParams.md), [`NewDocketResults`](../type-aliases/NewDocketResults.md)\>

## Constructors

### new NewDocketSearch()

> **new NewDocketSearch**(`params`): [`NewDocketSearch`](NewDocketSearch.md)

#### Parameters

• **params**: `Partial`\<[`NewDocketParams`](../type-aliases/NewDocketParams.md)\>

#### Returns

[`NewDocketSearch`](NewDocketSearch.md)

#### Overrides

`Search<
  NewDocketParams,
  NewDocketResults
>.constructor`

#### Source

[search/newDocket.ts:18](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/newDocket.ts#L18)

## Properties

### data

> **data**: `undefined` \| [`NewDocketResults`](../type-aliases/NewDocketResults.md)

#### Inherited from

`Search.data`

#### Source

[search/search.ts:8](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/search.ts#L8)

***

### defaultParams

> `readonly` **defaultParams**: [`NewDocketParams`](../type-aliases/NewDocketParams.md) = `defaultSearch`

#### Overrides

`Search.defaultParams`

#### Source

[search/newDocket.ts:15](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/newDocket.ts#L15)

***

### fetch()

> **fetch**: (`params`) => `Promise`\<[`NewDocketResults`](../type-aliases/NewDocketResults.md)\>

#### Parameters

• **params**

#### Returns

`Promise`\<[`NewDocketResults`](../type-aliases/NewDocketResults.md)\>

#### Overrides

`Search.fetch`

#### Source

[search/newDocket.ts:16](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/newDocket.ts#L16)

***

### params

> **params**: [`NewDocketParams`](../type-aliases/NewDocketParams.md)

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

[search/newDocket.ts:31](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/newDocket.ts#L31)

***

### setFetch()

> **setFetch**(): `void`

#### Returns

`void`

#### Source

[search/newDocket.ts:24](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/newDocket.ts#L24)

***

### updateParams()

> **updateParams**(`params`): `void`

#### Parameters

• **params**: `Partial`\<[`NewDocketParams`](../type-aliases/NewDocketParams.md)\>

#### Returns

`void`

#### Source

[search/newDocket.ts:35](https://github.com/4very/ferc-elibrary-api/blob/26cf3a80a2b0f4f142a63a2fbb278e16f26a1d37/src/search/newDocket.ts#L35)
