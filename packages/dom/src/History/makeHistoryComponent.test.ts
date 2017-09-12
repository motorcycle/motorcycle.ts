import { HistorySinks, HistorySources, makeHistoryComponent } from './'
import { Test, describe, given, it } from '@typed/test'
import { empty, now, observe, skip, take } from '@motorcycle/stream'

export const test: Test = describe(`makeHistoryComponent`, [
  given(`Location and History`, [
    it(`returns an History Component function`, ({ equal }) => {
      const History = makeHistoryComponent(location, history)

      equal('function', typeof History)
    }),
  ]),

  describe(`History Component`, [
    given(`history$ that never emits`, [
      it(`startsWith initial location`, ({ same }) => {
        const location = Object.create(null) as Location
        const history = Object.create(null) as History

        const History = makeHistoryComponent(location, history)

        const sinks: HistorySinks = { history$: empty() }

        const { location$ }: HistorySources = History(sinks)

        return observe(same(location), take(1, location$))
      }),

      it(`emits location on popstate events`, ({ same }, done) => {
        const location = Object.create(null) as Location
        const state = { hello: 'world' }
        const history = { state } as History

        const History = makeHistoryComponent(location, history)

        const sinks: HistorySinks = { history$: empty() }

        const { location$ }: HistorySources = History(sinks)

        observe(same(location), take(1, skip(1, location$)))
          .then(() => done())
          .catch(done)

        setTimeout(() => {
          window.dispatchEvent(new Event('popstate', { bubbles: true }))
        })
      }),

      it(`startsWith initial state`, ({ equal }) => {
        const location = Object.create(null) as Location
        const state = { hello: 'world' }
        const history = { state } as History

        const History = makeHistoryComponent(location, history)

        const sinks: HistorySinks = { history$: empty() }

        const { state$ }: HistorySources = History(sinks)

        return observe(equal(state), take(1, state$))
      }),

      it(`emits state on popstate events`, ({ equal }, done) => {
        const location = Object.create(null) as Location

        const state = { hello: 'world' }
        const history = { state } as History

        const History = makeHistoryComponent(location, history)

        const sinks: HistorySinks = { history$: empty() }

        const { state$ }: HistorySources = History(sinks)

        observe(equal(state), take(1, skip(1, state$)))
          .then(() => done())
          .catch(done)

        setTimeout(() => {
          window.dispatchEvent(new Event('popstate', { bubbles: true }))
        })
      }),
    ]),

    given(`a history$ that emits`, [
      it(`calls effect function with supplied history`, ({ same }, done) => {
        const history = Object.create(null) as History
        const location = Object.create(null) as Location

        function historyEffect(actual: History): void {
          same(history, actual)
          done()
        }

        const History = makeHistoryComponent(location, history)

        History({ history$: now(historyEffect) })
      }),

      it(`updates location$`, ({ equal }) => {
        const expected = '/example'

        function historyEffect(actual: History): void {
          actual.pushState(null, '', expected)
        }

        const { location$ } = makeHistoryComponent(location, history)({
          history$: now(historyEffect),
        })

        return observe(({ pathname }) => equal(expected, pathname), take(1, skip(1, location$)))
      }),

      it(`updates state$`, ({ equal }) => {
        const location = Object.create(null) as Location
        const history = ({
          state: null,
          replaceState(state: any) {
            this.state = state
          },
        } as any) as History

        const expected = { hello: 'world' }

        function historyEffect(actual: History): void {
          actual.replaceState(expected, '')
        }

        const History = makeHistoryComponent(location, history)

        const { state$ } = History({ history$: now(historyEffect) })

        return observe(equal(expected), take(1, skip(1, state$)))
      }),
    ]),
  ]),
])
