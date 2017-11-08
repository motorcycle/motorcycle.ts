/**
 * Turn a stream of promises into a stream containing the promises' values.
 * Note that order is always preserved, regardless of promise fulfillment order.
 *
 * @name awaitPromises<A>(stream: Stream<Promise<A>>): Stream<A>
 * @example
 * import { mergeArray, fromPromise, at, now, observe } from '@motorcycle/stream'
 *
 * // ----1------->
 * const a = new Promise(resolve => setTimeout(resolve, 100, 1))
 * // ---------2-->
 * const b = new Promise(resolve => setTimeout(resolve, 200, 2))
 * // --3--------->
 * const c = new Promise(resolve => setTimeout(resolve, 50, 3))
 *
 * // bc---a------->
 * const source = mergeArray([ at(100, a), now(b), now(c) ])
 *
 * // -----1----23->
 * const stream = awaitPromises(source)
 */
export { awaitPromises } from '@most/core'
