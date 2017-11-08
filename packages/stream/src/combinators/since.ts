/**
 * Discard all events in one stream until the first event occurs in another.:
 *
 * @name since<A>(startSingal: Stream<any>, stream: Stream<A>): Stream<A>
 * @example
 * import { since } from '@motorcycle/stream'
 *
 * const source = // -1-2-3-4-5-6-7-8->
 * const start =  // --------x-------->
 * //                ---------5-6-7-8->
 * const stream = since(start, source)
 */
export { since } from '@most/core'
