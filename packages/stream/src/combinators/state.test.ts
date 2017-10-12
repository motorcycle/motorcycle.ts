import { Test, describe, given, it } from '@typed/test'
import { at, mergeArray, observe, state } from './'

import { Stream } from '@motorcycle/types'
import { add } from '@typed/prelude'

export const test: Test = describe(`state`, [
  given(`(a -> b -> a) -> Stream a -> Stream b`, [
    it(`returns Stream a`, ({ equal }) => {
      const a$ = mergeArray([at(0, 0), at(100, 100), at(200, 200)])
      const b$ = mergeArray([at(1, 1), at(2, 2)])

      const expected = [0, 1, 3, 100, 101, 103, 200, 201, 203]
      const sut = state(add, a$, b$)

      return collectEvents(sut).then(equal(expected))
    }),

    it(`does not emit repeated values`, ({ equal }) => {
      const a$ = mergeArray([at(0, 0), at(100, 100), at(200, 200)])
      const b$ = mergeArray([at(1, 1), at(2, 0)])

      const expected = [0, 1, 100, 101, 200, 201]
      const sut = state(add, a$, b$)

      return collectEvents(sut).then(equal(expected))
    }),

    it(`emits latest value to late subscribers`, ({ equal }, done) => {
      const a$ = mergeArray([at(0, 0), at(500, 100), at(1000, 200)])
      const b$ = mergeArray([at(150, 1), at(300, 2)])

      const sut = state(add, a$, b$)

      setTimeout(() => {
        const expected = [100, 101, 103, 200, 201, 203]
        collectEvents(sut)
          .then(equal(expected))
          .then(() => done())
          .catch(done)
      }, 550)

      collectEvents(sut)
    }),
  ]),
])

function collectEvents<A>(stream: Stream<A>): Promise<Array<A>> {
  const events: Array<A> = []

  return observe(x => events.push(x), stream).then(() => events)
}
