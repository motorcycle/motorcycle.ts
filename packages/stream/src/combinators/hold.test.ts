import { Test, describe, given, it } from '@typed/test'
import { chain, observe, periodic, scan, take } from '../'

import { Stream } from '@motorcycle/types'
import { hold } from './hold'

export const test: Test = describe(`hold`, [
  given(`a Stream`, [
    it(`returns a Stream that delivers most recent event to new observer`, ({ equal }) => {
      const stream = hold<number>(scan(x => x + 1, 0, periodic(5)))

      const sut: Stream<number> = chain(() => take(3, stream), take(1, stream))

      return collectEvents(sut).then(equal([0, 1, 2]))
    }),
  ]),
])

function collectEvents<A>(stream: Stream<A>): Promise<Array<A>> {
  const events: Array<A> = []

  return observe((x: A) => events.push(x), stream).then(() => events)
}
