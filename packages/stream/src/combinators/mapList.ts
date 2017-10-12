import { Stream } from '@motorcycle/types'
import { curry2 } from '@typed/prelude'
import { map } from './map'
import { map as mapArray } from '@typed/list'

/**
 * Applies a function to all Sinks in a list of Sinks.
 * 
 * @name mapList<A, B>(f: (value: A, index: number) => B, sinksList$: Stream<ArrayLike<A>>): Stream<ReadonlyArray<B>>
 * @example
 * import { mapList } from '@motorcycle/stream'
 * 
 * function Component(sources) {
 *   const { listOfData$ } = sources
 * 
 *   const sinksList$: Stream<ReadonlyArray<Sinks>> = mapList(
 *     data => ChildComponent({ ...sources, data$: now(data) })), 
 *     listOfData$,
 *   )
 * 
 *   const childViews$: Stream<ReadonlyArray<Stream<VNode>> = 
 *     mapList(({ view$ }) => view$, sinksList$)
 * 
 *   ...
 * }
 */
export const mapList: MapList = curry2(__mapList)

export type MapList = {
  <A, B>(f: (value: A, index: number) => B, list$: Stream<ArrayLike<A>>): Stream<ReadonlyArray<B>>
  <A, B>(f: (value: A, index: number) => B): (
    list$: Stream<ArrayLike<A>>
  ) => Stream<ReadonlyArray<B>>
}

function __mapList<A, B>(
  f: (value: A) => B,
  list$: Stream<ArrayLike<A>>
): Stream<ReadonlyArray<B>> {
  return map<ArrayLike<A>, ReadonlyArray<B>>(mapArray(f), list$)
}
