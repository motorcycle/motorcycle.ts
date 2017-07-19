import { Test, describe, given, it } from '@typed/test'

import { Stream } from '@motorcycle/types'
import { drain } from './drain'
import { mapSinks } from './mapSinks'
import { now } from '../sources'
import { observe } from './observe'

export const test: Test = describe(`mapSinks`, [
  given(`a function and a stream of array of sinks`, [
    it(`applies the function to each set of sinks`, ({ equal }) => {
      type Sinks = {
        foo: Stream<number>
      }

      const sinks: Sinks = {
        foo: now(1),
      }

      const sinksList$: Stream<Array<Sinks>> = now([sinks, sinks, sinks, sinks])

      let called = 0

      const f = () => {
        ++called
      }

      return drain(mapSinks(f, sinksList$)).then(() => {
        equal(4, called)
      })
    }),

    it(`returns a stream containing mapped values`, ({ equal }) => {
      type Sinks = {
        foo: Stream<number>
      }

      const sinks: Sinks = {
        foo: now(1),
      }

      const sinksList$: Stream<Array<Sinks>> = now([sinks, sinks, sinks, sinks])

      const f = (_: Sinks, index: number) => index

      return observe(equal([0, 1, 2, 3]), mapSinks(f, sinksList$))
    }),
  ]),
])
