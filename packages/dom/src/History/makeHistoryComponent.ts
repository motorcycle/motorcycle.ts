import { HistorySinks, HistorySources } from './types'
import { IOComponent, Stream } from '@motorcycle/types'
import {
  constant,
  drain,
  empty,
  hold,
  map,
  merge,
  multicast,
  startWith,
  tap,
} from '@motorcycle/stream'

import { EventStream } from '../common'

/**
 * Given implementations of the `Location` and `History` interfaces, it returns
 * an IOComponent function which facilitates performing side-effects with
 * the history API.
 * @name makeHistoryComponent<State = any>(location: Location, history: History): IOComponent<HistorySinks, HistorySources<State>>
 * @example
 * import { run } from '@motorcycle/run'
 * import { makeDomComponent, makeHistoryComponent } from '@motorcycle/dom'
 * import { UI } from './ui'
 *
 * const rootElementSelector = '#app'
 * const element = document.querySelector(rootElementSelector)
 *
 * if (!element) throw new Error(`Unable to find element by '${rootElementSelector}'`)
 *
 * const Dom = makeDomComponent(element)
 * const History = makeHistoryComponent(location, history)
 *
 * function IO(sinks) {
 *   return {
 *     ...Dom(sinks),
 *     ...History(sinks),
 *   }
 * }
 *
 * run(UI, IO)
 */
export function makeHistoryComponent<State = any>(
  location: Location,
  history: History
): IOComponent<HistorySinks, HistorySources<State>> {
  const popState$: Stream<PopStateEvent> =
    typeof window === void 0 ? empty() : new EventStream('popstate', window, {})

  return function History(sinks: HistorySinks): HistorySources {
    const { history$ } = sinks

    const performHistoryEffect$ = multicast(tap(historyEffect => historyEffect(history), history$))
    const updateSignal$ = multicast(merge<any>(performHistoryEffect$, popState$))

    const location$ = hold(startWith(location, constant(location, updateSignal$)))
    const state$ = hold(
      map(({ state }) => state, startWith(history, constant(history, updateSignal$)))
    )

    drain(performHistoryEffect$)

    return { location$, state$ }
  }
}
