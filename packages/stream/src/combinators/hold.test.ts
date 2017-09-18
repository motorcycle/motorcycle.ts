import { Test, describe, given, it } from '@typed/test'
import { drain, observe, periodic, scan, scheduler, skip, take } from '../'

import { Stream } from '@motorcycle/types'
import { hold } from './hold'

export const test: Test = describe(`hold`, [
  given(`a Stream`, [
    it(`returns a Stream that delivers most recent event to new observer`, ({ equal }) => {
      const stream = hold<number>(scan(x => x + 1, 0, skip(1, periodic(100))))

      drain(stream)

      return drain(take(1, stream)).then(() => {
        const sut: Stream<number> = take(3, stream)

        return collectEvents(sut).then(equal([0, 1, 2]))
      })
    }),

    it(`does not emit on the same tick as run`, ({ ok, notOk }) => {
      const stream = hold(scan(x => x + 1, 0, periodic(5)))

      return drain(take(1, stream)).then(() => {
        let called = false

        stream.run(
          {
            event() {
              called = true
            },
            error() {},
            end() {},
          },
          scheduler
        )

        notOk(called)

        return Promise.resolve().then(() => ok(called))
      })
    }),
  ]),
])

function collectEvents<A>(stream: Stream<A>): Promise<Array<A>> {
  const events: Array<A> = []

  return observe((x: A) => events.push(x), stream).then(() => events)
}
