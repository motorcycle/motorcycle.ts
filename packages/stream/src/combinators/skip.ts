/**
 * Skip the first `n` number of events.
 *
 * @name skip<A>(quanity: number, stream: Stream<A>): Stream<A>
 * @example
 * import { skip } from '@motorcycle/stream'
 *
 * const source = // -1-2-3-4-5-6-7-8-9-10->
 * //                -----------6-7-8-9-10->
 * const stream = skip(5, source)
 */
export { skip } from '@most/core'
