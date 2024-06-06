import { describe, expect, test } from 'vitest'
import NewDocketSearch from '~/search/newDocket'
import { DEFAULT_NEW_DOCKET_SEARCH } from './consts/newDocketSearch'

describe.concurrent('New Docket Search', () => {
  test('Default Search', async () => {
    const s = new NewDocketSearch({})
    await s.getData()
    expect(s.data).toEqual(DEFAULT_NEW_DOCKET_SEARCH)
  })
})
