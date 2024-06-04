import { describe, expect, test } from 'vitest'
import GeneralSearch from '../src/search/general'
import {
  EMPTY_GENERAL_SEARCH,
  NULL_SEARCH_RESULT,
  SINGLE_GENERAL_SEARCH,
  SINGLE_PAGE_SEARCH_PARAMS,
} from './consts/generalSearch'

describe.concurrent('General Search', () => {
  test('Empty Search', async () => {
    const s = new GeneralSearch({
      docketSearches: [
        {
          docketNumber: 'FAKEDOCKET',
          subDocketNumbers: [],
        },
      ],
    })
    await s.getData()
    expect(s.data).toEqual(EMPTY_GENERAL_SEARCH)
  })

  test('Single Result Search', async () => {
    const s = new GeneralSearch({
      docketSearches: [
        {
          docketNumber: 'P-15056-000',
          subDocketNumbers: [],
        },
      ],
      dateSearches: [
        {
          dateType: 'filed_date',
          startDate: '2020-11-19',
          endDate: '2020-11-19',
        },
      ],
    })
    await s.getData()
    expect(s.data).toEqual(SINGLE_GENERAL_SEARCH)
  })
  test('Null Docket Number', async () => {
    const s = new GeneralSearch({
      docketSearches: [
        {
          docketNumber: null,
          subDocketNumbers: null,
        },
      ],
    })
    await s.getData()
    expect(s.data).toEqual(NULL_SEARCH_RESULT)
  })
  test('Single Page Search', async () => {
    const s = new GeneralSearch(SINGLE_PAGE_SEARCH_PARAMS)
    await s.getData()
    expect(await s.prevPage()).toBe(false)
    expect(await s.nextPage()).toBe(true)
    expect(await s.nextPage()).toBe(false)
    expect(await s.prevPage()).toBe(true)
  })
})
