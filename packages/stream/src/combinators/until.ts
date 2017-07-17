/**
 * Keep all events in one stream until the first event occurs in another.
 * 
 * @name until<A>(endSignal: Stream<any>, stream: Stream<A>): Stream<A>
 * @example
 * import { until } from '@motorcycle/stream'
 * 
 * const source =     // --1-2-3-4-5-6-7-8->
 * const endSignal =  // ---------z-------->
 * //                    --1-2-3-4|
 * const stream = until(endSingal, source)
 */
export { until } from '@most/core'
