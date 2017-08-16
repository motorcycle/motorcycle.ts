import * as fetchMock from 'fetch-mock'

import { Test, describe, given, it } from '@typed/test'
import { now, observe } from '@motorcycle/stream'

import { Fetch } from './Fetch'
import { FetchSinks } from './types'
import { get } from './requests'
import { run } from '@motorcycle/test'

export const test: Test = describe(`Fetch`, [
  given(`FetchSinks`, [
    it(`return FetchSources`, ({ equal }) => {
      const url = '/test'
      const json = { hellow: 'world' }

      fetchMock.get(url, json)

      const sinks: FetchSinks = { request$: now(get(url)) }
      const { sources: { response$ }, tick } = run(() => sinks, Fetch)

      tick(Infinity)

      return observe(response => equal(get(url), response.request), response$).then(() =>
        fetchMock.reset()
      )
    }),
  ]),
])
