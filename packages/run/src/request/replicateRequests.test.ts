import { Test, describe, given, it } from '@typed/test'
import { createProxy, now, observe } from '@motorcycle/stream'

import { replicateRequests } from './replicateRequests'

export const test: Test = describe(`replicateRequests`, [
  given(`Requests and Proxy Requests`, [
    it(`replicates events from Requests to Proxy Requests`, ({ equal }) => {
      const requests = {
        other: now(2),
      }

      const proxyRequests = {
        other: createProxy<number>().stream,
      }

      replicateRequests(requests, proxyRequests)

      return observe(equal(2), proxyRequests.other)
    }),

    it(`returns a Disposable`, ({ equal }) => {
      const requests = {
        other: now(2),
      }

      const proxyRequests = {
        other: createProxy<number>().stream,
      }

      const disposable = replicateRequests(requests, proxyRequests)

      equal('function', typeof disposable.dispose)
    }),
  ]),
])
