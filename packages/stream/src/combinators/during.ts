/**
 * Keep events that occur during a time window defined by a higher-order stream.
 * 
 * @name during<A>(signal: Stream<Stream<any>>, stream: Stream<A>): Stream<A>
 * @example
 * import { during } from '@motorcycle/stream'
 * 
 * const source = // -1-2-3-4-5-6-7-8->
 * const signal = // ------s---------->
 * const s      = //       --------x-->
 * //                -------4-5-6-7|
 * const stream = during(signal, source)
 */
export { during } from '@most/core'
