/**
 * Creates a new stream by applying a function with a value at increasing 
 * index of an array and the latest event value from a stream. The resulting 
 * stream will end when all array values have been used or as soon as the 
 * underlying stream ends.
 * 
 * @name zipArrayValues<A, B, C>(f: (arrayValue: A, streamValue: Stream<B>) => C, array: Array<A>, stream: Stream<B>): Stream<C>
 * @example
 * import { zipArrayValues, now, concat, observe } from '@motorcycle/stream'
 * 
 * const f = (x, y) => x + y
 * 
 * const array = [ 100, 200 ]
 * const stream = concat(now(1), now(2))
 * 
 * observe(console.log, zipArrayValues(f, array, stream))
 * // 101
 * // 202
 */
export { zipArrayValues } from '@most/core'
