import { Dialogue, Requests, Responses, Stream } from '@motorcycle/types'
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
 * @name HistoryEffect
 * @exampleexport interface HistoryEffect {
 *   (h: History): void
 * }
 * @type
 */
export interface HistoryEffect {
  (h: History): void
}

/**
 * @name HistoryResponses
 * @example
 * export interface HistoryResponses<State = any> extends Responses {
 *   readonly location$: Stream<Readonly<Location>>
 *   readonly state$: Stream<State>
 * }
 * @type
 */
export interface HistoryResponses<State = any> extends Responses {
  readonly location$: Stream<Readonly<Location>>
  readonly state$: Stream<State>
}

/**
 * @name HistoryRequests
 * @example
 * export interface HistoryRequests extends Requests {
 *   readonly historyEffect$: Stream<HistoryEffect>
 * }
 * @type
 */
export interface HistoryRequests extends Requests {
  readonly historyEffect$: Stream<HistoryEffect>
}

export interface HistoryDialogueOver {
  <State = any>(l: Location, h: History): Dialogue<HistoryRequests, HistoryResponses<State>>
}

/**
 * Given implementations of the `Location` and `History` interfaces, it returns
 * an Dialogue function, which performs side-effects with the history API.
 * 
 * @name historyDialogueOver<State = any>(location: Location, history: History): Dialogue<HistoryRequests, HistoryResponses<State>>
 * @example
 * import { run } from '@motorcycle/run'
 * import { historyDialogueOver } from '@motorcycle/dom'
 * import { domDialogueOver } from '@motorcycle/mostly-dom'
 * import { main } from './main'
 *
 * const rootElementSelector = '#app'
 * const element = document.querySelector(rootElementSelector)
 *
 * if (!element) throw new Error(`Unable to find element by '${rootElementSelector}'`)
 *
 * const domDialogue = domDialogueOver(element)
 * const historyDialogue = historyDialogueOver(location, history)
 *
 * function dialogue(rs) {
 *   return {
 *     ...domDialogue(rs),
 *     ...historyDialogue(rs),
 *   }
 * }
 *
 * run({main, dialogue})
 */
export const historyDialogueOver: HistoryDialogueOver = function<State = any>(
  l: Location,
  h: History
): Dialogue<HistoryRequests, HistoryResponses<State>> {
  const pse$: Stream<PopStateEvent> =
    typeof window === void 0 ? empty() : new EventStream('popstate', window, {})

  return function historyDialogue({ historyEffect$ }: HistoryRequests): HistoryResponses {
    const he$ = multicast(tap(he => he(h), historyEffect$))
    const s$ = multicast(merge<any>(he$, pse$))
    const location$ = hold(startWith(l, constant(l, s$)))
    const state$ = hold(map(({ state }) => state, startWith(h, constant(h, s$))))

    drain(he$)

    return { location$, state$ }
  }
}
