import { Test, describe, given, it } from '@typed/test'

import { Stream } from '@motorcycle/types'
import { at } from '../sources'
import { observe } from './observe'
import { switchMerge } from './switchMerge'

export const test: Test = describe(`switchMerge`, [
  given(`a stream of array of streams`, [
    it(`returns a merged stream`, ({ equal }) => {
      const a = at(100, 1)
      const b = at(250, 3)
      const c = at(150, 2)
      const d = at(300, 4)

      const stream: Stream<Array<Stream<number>>> = at(0, [a, b, c, d])

      return collectEvents(switchMerge(stream)).then(equal([1, 2, 3, 4]))
    }),
  ]),
])

function collectEvents<A>(stream: Stream<A>): Promise<Array<A>> {
  const events: Array<A> = []

  return observe(x => events.push(x), stream).then(() => events)
}
