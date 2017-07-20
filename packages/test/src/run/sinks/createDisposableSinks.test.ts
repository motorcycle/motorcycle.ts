import { Test, describe, given, it } from '@typed/test'
import { at, drain, periodic } from '@motorcycle/stream'

import { createDisposableSinks } from './createDisposableSinks'

export const test: Test = describe(``, [
  given(`Sinks and EndSignal`, [
    it(`disposes Sinks when EndSignal emits`, ({ ok }) => {
      const sinks = {
        test: periodic(100),
      }

      const endSignal = at(10, void 0)

      const { test } = createDisposableSinks(sinks, endSignal)

      return drain(test).then(() => ok(true))
    }),
  ]),
])
