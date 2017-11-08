/**
 * Keep all events until predicate returns false, and discard the rest.
 *
 * @name takeWhile<A>(predicate: (value: A) => boolean, stream: Stream<A>): Stream<A>
 * @example
 * import { takeWhile } from '@motorcycle/stream'
 *
 * const source = // -2-4-5-6-8->
 * //                -2-4-|
 * const stream = takeWhile(even, source)
 */
export { takeWhile } from '@most/core'
