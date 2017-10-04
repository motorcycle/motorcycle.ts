import { Test, describe, given, it } from '@typed/test'

import { Stream } from '@motorcycle/types'
import { mapList } from './mapList'
import { now } from '../'
import { observe } from './observe'

export const test: Test = describe(`mapList`, [
  given(`(a -> b) -> Stream (Array a)`, [
    it(`returns Stream (Array b)`, ({ equal }) => {
      const values = [0, 1, 2, 3]
      const f = (x: number) => String(x + 1)
      const expected = ['1', '2', '3', '4']

      const list$ = now(values)

      const sut = mapList(f, list$)

      return collectEvents(sut).then(equal([expected]))
    }),
  ]),
])

function collectEvents<A>(stream: Stream<A>): Promise<Array<A>> {
  const events: Array<A> = []

  return observe(x => events.push(x), stream).then(() => events)
}
