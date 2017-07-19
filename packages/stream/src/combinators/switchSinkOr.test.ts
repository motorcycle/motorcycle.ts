import { Test, describe, given, it } from '@typed/test'
import { empty, now } from '../sources'

import { Stream } from '@motorcycle/types'
import { observe } from './observe'
import { switchSinkOr } from './switchSinkOr'

export const test: Test = describe(`switchSinkOr`, [
  given(`a fallback stream, a sink name, and a stream of sinks`, [
    it(`switches to sink stream if it is present`, ({ equal }) => {
      type Sinks = {
        readonly foo: Stream<number>
      }

      const sinks$: Stream<Sinks> = now({ foo: now(1) })

      return observe(equal(1), switchSinkOr(empty(), 'foo', sinks$))
    }),

    it(`switches to fallback stream if not present`, ({ equal }) => {
      type Sinks = {
        readonly foo: Stream<number>
      }

      const sinks$: Stream<Sinks> = now({})

      return observe(equal(1), switchSinkOr(now(1), 'foo', sinks$))
    }),
  ]),
])
