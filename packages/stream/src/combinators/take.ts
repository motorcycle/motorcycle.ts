/**
 * Take at most the first `n` events of a stream.
 * 
 * @name take<A>(quantity: number, stream: Stream<A>): Stream<A>
 * @example
 * import { take } from '@motorcycle/stream'
 * 
 * const source = // -1-2-3-4-5-6-7-8-9-10->
 * //                -1-2-3|
 * const stream = take(3, source)
 */
export { take } from '@most/core'
