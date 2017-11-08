/**
 * Replace the end signal with a new stream returned by f. Note that f must return a stream.
 *
 * @name continueWith(f: () => Stream<A>, stream: Stream<A>): Stream<A>
 * @example
 * import { continueWith, at } from '@motorcycle/stream'
 *
 * // ----1------>
 * const a = at(100, 1)
 * // ----2------>
 * const b = at(100, 2)
 *
 * // ----1----2->
 * const stream = continueWith(() => b, a)
 */
export { continueWith } from '@most/core'
