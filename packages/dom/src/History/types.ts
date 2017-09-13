import { Stream } from '@motorcycle/types'

/**
 * @name HistorySinks
 * @example
 * export type HistorySinks = {
 *   readonly history$: Stream<HistoryEffect>
 * }
 * @type
 */
export type HistorySinks = {
  readonly history$: Stream<HistoryEffect>
}

/**
 * @name HistoryEffect
 * @example
 * export type HistoryEffect = (history: History) => void
 * @type
 */
export type HistoryEffect = (history: History) => void

/**
 * @name HistorySources
 * @example
 * export type HistorySources<State = any> = {
 *   readonly location$: Stream<Readonly<Location>>
 *   readonly state$: Stream<State>
 * }
 * @type
 */
export type HistorySources<State = any> = {
  readonly location$: Stream<Readonly<Location>>
  readonly state$: Stream<State>
}
