import { Dialogue, Main, run } from './run'
import { Test, describe, given, it } from '@typed/test'
import { createProxy, observe, periodic, scan, skip, take, tap, until } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'

export const test: Test = describe(`run`, [
  given(`a RunSpec`, [
    it(`returns IODisposable`, ({ equal, ok }) => {
      type Responses = {
        readonly foo: Stream<number>
      }

      type Requests = {
        readonly bar: Stream<number>
      }

      const main: Main<Responses, Requests> = function main(): Requests {
        const bar = scan(x => x + 1, 0, skip(1, periodic(10)))

        return { bar }
      }

      const dialogue: Dialogue<Requests, Responses> = function dialogue(): Responses {
        const foo = scan(x => x + 1, 0, skip(1, periodic(10)))

        return { foo }
      }

      const { responses, requests, dispose } = run({ main, dialogue })

      equal('object', typeof requests)
      ok(isStream(requests.bar))
      equal('object', typeof responses)
      ok(isStream(responses.foo))
      equal('function', typeof dispose)
      dispose()
    }),

    it(`replicates events from Requests to Responses`, ({ equal }, done) => {
      type Responses = {
        readonly foo: Stream<number>
      }

      type Requests = {
        readonly bar: Stream<number>
      }

      const main: Main<Responses, Requests> = function main(x: Responses): Requests {
        const { foo } = x

        collectEvents(take(3, foo))
          .then(equal([0, 1, 2]))
          .then(() => done())
          .catch(done)

        const bar = scan(x => x + 5, 0, skip(1, periodic(10)))

        return { bar }
      }

      const dialogue: Dialogue<Requests, Responses> = function dialogue(): Responses {
        const foo = scan(x => x + 1, 0, skip(1, periodic(1)))

        return { foo }
      }

      run({ main, dialogue })
    }),

    describe(`dispose`, [
      it(`stops Request streams from emitting`, ({ equal }) => {
        type Responses = {}

        type Requests = {
          readonly test: Stream<number>
        }

        const test = scan(x => x + 1, 0, skip(1, periodic(100)))

        const main: Main<Responses, Requests> = () => ({ test })

        const dialogue: Dialogue<Requests, Responses> = () => ({})

        const { requests, dispose } = run({ main, dialogue })

        setTimeout(() => dispose(), 250)

        return collectEvents(requests.test).then(equal([0, 1, 2]))
      }),

      it(`stops Responses with .dispose method from emitting`, ({ equal }) => {
        const test = scan(x => x + 1, 0, skip(1, periodic(100)))

        type Responses = {
          readonly test: {
            readonly foo: Stream<number>
            dispose(): void
          }
        }

        type Requests = {
          readonly test: Stream<number>
        }

        const main: Main<Responses, Requests> = () => ({ test })

        const { stream: endSignal } = createProxy<void>()
        const foo = until(endSignal, test)

        const dialogue: Dialogue<Requests, Responses> = () => ({
          test: {
            foo,
            dispose: () => endSignal.event(0, void 0),
          },
        })

        const { responses, dispose } = run({ main, dialogue })

        return collectEvents(
          tap(n => {
            if (n === 3) dispose()
          }, responses.test.foo)
        ).then(equal([0, 1, 2, 3]))
      }),
    ]),
  ]),
])

function collectEvents<A>(stream: Stream<A>): Promise<Array<A>> {
  const events: Array<A> = []

  return observe(x => events.push(x), stream).then(() => events)
}

function isStream(x: any): x is Stream<any> {
  return x && typeof x.run === 'function'
}
