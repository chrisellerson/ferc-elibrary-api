import { describe, expect, test } from 'vitest'
import DocketSearch from '../src/search/docket'
import { EMPTY_DOCKET_SEARCH } from './consts/docketSearch'

describe.concurrent('Docket Search', () => {
  test('Empty Search', async () => {
    const s = new DocketSearch({})
    await s.getData()
    expect(s.data).toEqual(EMPTY_DOCKET_SEARCH)
  })
  test('Single Page Search', async () => {
    const s = new DocketSearch({ numHits: 2 })
    await s.getData()
    expect(await s.prevPage()).toBe(false)
    expect(await s.nextPage()).toBe(true)
    expect(await s.nextPage()).toBe(false)
    expect(await s.prevPage()).toBe(true)
  })
})
