import { Stream } from '@motorcycle/types'
import { curry3 } from '@most/prelude'
import { map } from './map'
import { switchLatest } from './switchLatest'

/**
 * Flattens a stream of sinks into a single sink.
 *
 * @name switchSinkOr<Sinks, K extends keyof Sinks>(or$: Sinks[K], sinkName: K, sinks$: Stream<Sinks>): Sinks[K]
 * @example
 * import { switchSinkOr, map, now, never } from '@motorcycle/stream'
 *
 * const switchSinkOrNever = switchSinkOr(never())
 *
 * function Component(sources) {
 *   const { listOfItems$ } = sources
 *
 *  const sinks$ = map(items => SubComponent({ ...sources, items$: now(items) }), listOfItems$)
 *
 *  const history$ = switchSinkOrNever('history$', sinks$)
 *
 *  return { history$ }
 * }
 */
export const switchSinkOr: SwitchSinkOr = curry3<any, any, any, any>(function switchSinkOr<
  Sinks extends { readonly [key: string]: Stream<any> },
  K extends keyof Sinks = keyof Sinks
>(or$: Sinks[K], sinkName: K, sinks$: Stream<Sinks>): Sinks[K] {
  return switchLatest(map(sinks => sinks[sinkName] || or$, sinks$))
})

export interface SwitchSinkOr {
  <Sinks extends { readonly [key: string]: Stream<any> }, K extends keyof Sinks = keyof Sinks>(
    or$: Sinks[K],
    sinkName: K,
    sinks$: Stream<Sinks>
  ): Sinks[K]

  <Sinks extends { readonly [key: string]: Stream<any> }, K extends keyof Sinks = keyof Sinks>(
    or$: Sinks[K],
    sinkName: K
  ): (sinks$: Stream<Sinks>) => Sinks[K]

  <Sinks extends { readonly [key: string]: Stream<any> }, K extends keyof Sinks = keyof Sinks>(
    or$: Sinks[K]
  ): (sinkName: K, sinks$: Stream<Sinks>) => Sinks[K]

  <Sinks extends { readonly [key: string]: Stream<any> }, K extends keyof Sinks = keyof Sinks>(
    or$: Sinks[K]
  ): (sinkName: K) => (sinks$: Stream<Sinks>) => Sinks[K]
}
