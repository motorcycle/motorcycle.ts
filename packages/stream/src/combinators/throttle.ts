/**
 * Limit the rate of events to at most one per a number of milliseconds.
 *
 * In contrast to debounce, throttle simply drops events that occur "too often",
 * whereas debounce waits for a "quiet period".
 *
 * @name throttle<A>(ms: number, stream: Stream<A>): Stream<A>
 * @example
 * import { throttle } from '@motorcycle/stream'
 *
 * const source = // -abcd---abcd--->
 * //                -a-c----a-c---->
 * const stream = throttle(2, source)
 */
export { throttle } from '@most/core'
