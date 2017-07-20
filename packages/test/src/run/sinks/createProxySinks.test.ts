import { Test, describe, given, it } from '@typed/test'
import { createProxy, drain } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'
import { createProxySinks } from './createProxySinks'

export const test: Test = describe(`createProxySinks`, [
  it(`is a function`, ({ equal }) => {
    equal('function', typeof createProxySinks)
  }),

  given(`Sinks and ProxyStream`, [
    it(`returns an object`, ({ equal }) => {
      equal('object', typeof createProxySinks({}, createProxy<void>().stream))
    }),

    it(`returns a collection of streams`, ({ equal }) => {
      const sinks = createProxySinks<{ dom: Stream<number> }>({} as any, createProxy<void>().stream)

      equal('function', typeof sinks.dom.run)
    }),

    it(`ends the returned streams when ProxyStream emits`, ({ ok }) => {
      const { stream: endSignal } = createProxy<void>()

      const sinks = createProxySinks<any>({}, endSignal)

      setTimeout(() => endSignal.event(Date.now(), void 0))

      return drain(sinks.foo).then(() => ok(true))
    }),
  ]),
])
