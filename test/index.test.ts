import { bench, describe, expect, test } from 'vitest'
import GeneralSearch from '../src/search/general'
import { GeneralSearchParams, GeneralSearchResult } from '../src/types'
import {
  EMPTY_GENERAL_SEARCH,
  NULL_SEARCH_RESULT,
  SINGLE_GENERAL_SEARCH,
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
    await s.fetch()
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
    await s.fetch()
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
    await s.fetch()
    expect(s.data).toEqual(NULL_SEARCH_RESULT)
  })
  test('Null Docket Number', async () => {
    const s = new GeneralSearch({
      docketSearches: [
        {
          docketNumber: '',
          subDocketNumbers: [],
        },
      ],
      resultsPerPage: 200,
    })
    await s.fetch()

    const keys: (keyof GeneralSearchResult['searchHits'][number])[] = [
      'acesssionNumber',
      'familyValue',
      'docketNumbers',
      'score',
    ]
    const sets = Object.fromEntries(keys.map((k) => [k, new Set()]))

    s.data?.searchHits.forEach((e) => {
      keys.forEach((k) =>
        Array.isArray(e[k]) && typeof e[k] !== 'string'
          ? e[k]?.forEach((ek) => sets[k].add(ek))
          : sets[k].add(e[k])
      )
    })
    console.log(
      JSON.stringify(
        Object.fromEntries(
          Object.entries(sets).map(([key, val]) => [key, [...val]])
        )
      )
    )
    // expect(s.data).toEqual(NULL_SEARCH_RESULT)
  })
})
