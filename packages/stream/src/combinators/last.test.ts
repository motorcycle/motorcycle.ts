import { Test, describe, given, it } from '@typed/test'

import { Stream } from '@motorcycle/types'
import { last } from './last'
import { mergeArray } from './mergeArray'
import { now } from '../sources/now'
import { observe } from './observe'

export const test: Test = describe(`last`, [
  given(`a Stream a`, [
    it(`returns a Stream that emits only the last event`, ({ equal }) => {
      const stream = mergeArray([now(1), now(2), now(3)])
      const sut = last(stream)
      const expectedValue = 3

      return collectEvents(sut).then(equal([expectedValue]))
    }),
  ]),
])

function collectEvents<A>(stream: Stream<A>): Promise<ReadonlyArray<A>> {
  const values: Array<A> = []

  return observe(x => values.push(x), stream).then(() => values)
}
