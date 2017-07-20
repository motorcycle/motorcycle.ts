import { Test, describe, given, it } from '@typed/test'
import { createProxy, observe, periodic, scan, skip, take, tap, until } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'
import { run } from './run'

export const test: Test = describe(`run`, [
  given(`a Component and EffectfulComponent`, [
    it(`returns { sinks: Sinks, sources: Sources, dispose: () => void, tick: (delay: Delay) => Promise<void> }`, ({
      equal,
      ok,
    }) => {
      type Sources = {
        foo: Stream<number>
      }

      type Sinks = {
        bar: Stream<number>
      }

      function UI(): Sinks {
        const bar = scan(x => x + 1, 0, skip(1, periodic(10)))

        return { bar }
      }

      function Application(): Sources {
        const foo = scan(x => x + 1, 0, skip(1, periodic(10)))

        return { foo }
      }

      const { sinks, sources, dispose, tick } = run(UI, Application)

      equal('object', typeof sinks)
      ok(isStream(sinks.bar))
      equal('object', typeof sources)
      ok(isStream(sources.foo))
      equal('function', typeof dispose)

      return tick(500).then(dispose)
    }),

    it(`replicates events from Sinks to Sources`, ({ equal }, done) => {
      type Sources = {
        foo: Stream<number>
      }

      type Sinks = {
        bar: Stream<number>
      }

      function UI(sources: Sources): Sinks {
        const { foo } = sources

        collectEvents(take(3, foo)).then(equal([0, 1, 2])).then(() => done()).catch(done)

        const bar = scan(x => x + 5, 0, skip(1, periodic(10)))

        return { bar }
      }

      function Application(): Sources {
        const foo = scan(x => x + 1, 0, skip(1, periodic(1)))

        return { foo }
      }

      run(UI, Application)
    }),

    describe(`dispose`, [
      it(`stops sinks from emitting`, ({ equal }) => {
        const test = scan(x => x + 1, 0, skip(1, periodic(100)))

        const UI = () => ({ test })

        const Application = () => ({})

        const { sinks, dispose } = run(UI, Application)

        setTimeout(() => dispose(), 250)

        return collectEvents(sinks.test).then(equal([0, 1, 2]))
      }),

      it(`stops Sources with .dispose method from emitting`, ({ equal }) => {
        const test = scan(x => x + 1, 0, skip(1, periodic(100)))

        type Sources = {
          readonly test: {
            readonly foo: Stream<number>
            dispose(): void
          }
        }

        const UI = () => ({ test })

        const { stream: endSignal } = createProxy<void>()
        const foo = until(endSignal, test)

        const Application = () => ({
          test: {
            foo,
            dispose: () => endSignal.event(0, void 0),
          },
        })

        const { sources, dispose } = run<Sources, any>(UI, Application)

        return collectEvents(
          tap(n => {
            if (n === 3) dispose()
          }, sources.test.foo)
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
