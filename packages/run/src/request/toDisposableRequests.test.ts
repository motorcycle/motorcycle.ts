import { Test, describe, given, it } from '@typed/test'
import { at, drain, periodic } from '@motorcycle/stream'

import { EndSignal } from '..'
import { Stream } from '@motorcycle/types'
import { toDisposableRequests } from '.'

export const test: Test = describe(`toDisposableRequests`, [
  given(`Request and EndSignal`, [
    it(`disposes Request streams when EndSignal emits`, ({ ok }) => {
      type Requests = {
        readonly test: Stream<void>
      }

      const x: Requests = {
        test: periodic(100),
      }
      const y: EndSignal = at(10, void 0)
      const { test } = toDisposableRequests(x, y)

      return drain(test).then(() => ok(true))
    }),
  ]),
])
