import { Stream } from '@motorcycle/types'
import { combineArray } from './combineArray'
import { map } from './map'
import { now } from '../sources'
import { switchLatest } from './switchLatest'

export function switchCombine<A>(streamList$: Stream<Array<Stream<A>>>): Stream<ReadonlyArray<A>>
export function switchCombine<A>(
  streamList$: Stream<ArrayLike<Stream<A>>>
): Stream<ReadonlyArray<A>>
export function switchCombine<A>(
  streamList$: Stream<ReadonlyArray<Stream<A>>>
): Stream<ReadonlyArray<A>>

/**
 * Flattens an array of streams into an array of values. Particularly useful
 * when dealing with a list of children components.
 *
 * @name switchCombine<A>(streamList$: Stream<Array<Stream<A>>): Stream<ReadonlyArray<A>>
 * @example
 * import { switchCombine, mapSinks, map, now } from '@motorcycle/stream'
 *
 * function Component(sources) {
 *   const { listOfData$ } = sources
 *
 *   const childSinks$ = map(
 *     listOfData => listOfData.map(data => ChildComponent({ ...sources, data$: now(data) }))
 *     listOfData$
 *   )
 *
 *   const childViews$: Stream<ReadonlyArray<VNode>> =
 *     switchCombine(mapSinks(sinks => sinks.view$, childSinks$))
 *
 *   const view$ = map(view, childView$)
 *
 *   return { view$ }
 * }
 *
 * function view(childViews: ReadonlyArray<VNode>): VNode {
 *   // ...
 * }
 */
export function switchCombine<A>(streamList$: Stream<Array<Stream<A>>>): Stream<ReadonlyArray<A>> {
  return switchLatest(
    map(
      streams => (streams.length === 0 ? now([]) : combineArray((...items) => items, streams)),
      streamList$
    )
  )
}
