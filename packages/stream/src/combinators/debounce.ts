/**
 * Wait for a burst of events to subside and keep only the last event in the burst.
 * 
 * @name debounce<A>(ms: number, stream: Stream<A>): Stream<A>
 * @example
 * import { debounce } from '@motorcycle/stream'
 * 
 * const source = // abcd----abcd--->
 * //                -----d-------d->
 * const stream = debounce(2, source)
 */
export { debounce } from '@most/core'
