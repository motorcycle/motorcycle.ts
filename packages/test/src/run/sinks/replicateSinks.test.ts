import { Test, describe, given, it } from '@typed/test'
import { createProxy, now, observe } from '@motorcycle/stream'

import { replicateSinks } from './replicateSinks'

export const test: Test = describe(`replicateSinks`, [
  given(`Sink and Proxy Sinks`, [
    it(`replicates events from Sinks to ProxySinks`, ({ equal }) => {
      const sinks = {
        other: now(2),
      }

      const sinkProxies = {
        other: createProxy<number>().stream,
      }

      const { tick } = replicateSinks(sinks, sinkProxies)

      tick(500)

      return observe(equal(2), sinkProxies.other)
    }),

    it(`returns a disposable`, ({ equal }) => {
      const sinks = {
        other: now(2),
      }

      const sinkProxies = {
        other: createProxy<number>().stream,
      }

      const { disposable } = replicateSinks(sinks, sinkProxies)

      equal('function', typeof disposable.dispose)
    }),
  ]),
])
