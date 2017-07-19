import { Stream } from '@motorcycle/types'
import { map } from './map'
import { mergeArray } from './mergeArray'
import { switchLatest } from './switchLatest'

export function switchMerge<A>(streams$: Stream<Array<Stream<A>>>): Stream<A>
export function switchMerge<A>(streams$: Stream<ArrayLike<Stream<A>>>): Stream<A>
export function switchMerge<A>(streams$: Stream<ReadonlyArray<Stream<A>>>): Stream<A>
/**
 * Merges a list of streams into a single stream containing events 
 * from all of the stream. Particularly useful when dealing with a list of 
 * child components.
 * 
 * @name switchMerge<A>(streams$: Stream<Array<Stream<A>>): Stream<A>
 * @example 
 * import { switchMerge, mapSinks, now } from '@motorcycle/stream'
 * 
 * function Component(sources) {
 *   const { listOfData$ } = sources
 * 
 *   const childSinks$ = map(
 *     listOfData => listOfData.map(data => ChildComponent({ ...sources, data$: now(data) }))),
 *     listOfData$
 *   )
 * 
 *   const foo$ = switchMerge(mapSinks(sinks => sinks.foo$, childSinks$))
 * 
 *   return { foo$ } 
 * }
 */
export function switchMerge<A>(streams$: Stream<Array<Stream<A>>>): Stream<A> {
  return switchLatest(map(mergeArray, streams$))
}
