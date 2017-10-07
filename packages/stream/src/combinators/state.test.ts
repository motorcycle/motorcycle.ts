import { Test, describe, given, it } from '@typed/test'
import { at, mergeArray, observe, state } from './'

import { Stream } from '@motorcycle/types'
import { add } from '167'

export const test: Test = describe(`state`, [
  given(`(a -> b -> a) -> Stream a -> Stream b`, [
    it(`returns Stream a`, ({ equal }) => {
      const a$ = mergeArray([at(0, 0), at(100, 100), at(200, 200)])
      const b$ = mergeArray([at(1, 1), at(2, 2)])

      const expected = [0, 1, 3, 100, 101, 103, 200, 201, 203]
      const sut = state(add, a$, b$)

      return collectEvents(sut).then(equal(expected))
    }),
  ]),
])

function collectEvents<A>(stream: Stream<A>): Promise<Array<A>> {
  const events: Array<A> = []

  return observe(x => events.push(x), stream).then(() => events)
}
