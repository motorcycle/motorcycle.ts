/**
 * Accumulate results using a feedback loop that emits one value and feeds back
 * another to be used in the next iteration.
 *
 * It allows you to maintain and update a "state" while emitting a different
 * value. In contrast, scan feeds back and produces the same value.
 *
 * @name loop<A, B, C>(f: (accumulator: B, value: A) => { seed: B, value: C }, initial: B, stream: Stream<A>): Stream<A>
 * @example
 * import { loop, periodic, filter, observe } from '@motorcycle/stream'
 *
 * function pairwiseInterval (acc: number): { seed: number, value: [number, number] } {
 *   const seed = acc + 1
 *   const value =  [ acc, seed ]
 *
 *   return { seed, value }
 * }
 *
 * const stream = loop(pairwiseInterval, periodic(100))
 *
 * observe(console.log, stream)
 * // [ 0, 1 ]
 * // [ 1, 2 ]
 * // [ 2, 3 ]
 * // ....
 */
export { loop } from '@most/core'
