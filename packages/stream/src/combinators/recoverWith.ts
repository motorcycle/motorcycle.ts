/**
 * Recover from a stream failure by calling a function to create a new stream.
 *
 * @name recoverWith<A>((err: Error) => Stream<A>, stream: Stream<A>): Stream<A>
 * @example
 * import { recoverWith } from '@motorcycle/stream'
 *
 * // -1-2-3X------->
 * const a = // ...
 * // -4-5-6-------->
 * const b = // ...
 *
 * // -1-2-3-4-5-6-->
 * const stream = recoverWith(() => b, a)
 */
export { recoverWith } from '@most/core'
