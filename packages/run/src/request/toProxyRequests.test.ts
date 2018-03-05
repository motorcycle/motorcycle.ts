import { Test, describe, given, it } from '@typed/test'
import { createProxy, drain } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'
import { toProxyRequests } from '.'

export const test: Test = describe(`toProxyRequests`, [
  it(`is a function`, ({ equal }) => {
    equal('function', typeof toProxyRequests)
  }),

  given(`Requests and ProxyStream`, [
    it(`returns an object`, ({ equal }) => {
      equal('object', typeof toProxyRequests({}, createProxy<void>().stream))
    }),

    it(`returns a collection of streams`, ({ equal }) => {
      const requests = toProxyRequests<{ dom: Stream<number> }>(
        {} as any,
        createProxy<void>().stream
      )

      equal('function', typeof requests.dom.run)
    }),

    it(`ends the returned streams when ProxyStream emits`, ({ ok }) => {
      const { stream: endSignal } = createProxy<void>()

      const requests = toProxyRequests<any>({}, endSignal)

      setTimeout(() => endSignal.event(Date.now(), void 0))

      return drain(requests.foo).then(() => ok(true))
    }),
  ]),
])
