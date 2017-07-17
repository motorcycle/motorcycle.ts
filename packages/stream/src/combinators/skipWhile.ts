/**
 * Discard all events until predicate returns false, and keep the rest.
 * 
 * @name skipWhile(predicate: (value: A) => boolean, stream: Stream<A>): Stream<A>
 * @example
 * import { skipWhile } from '@motorcycle/stream'
 * 
 * const source = // -2-4-5-6-8->
 * //                 ----5-6-8->
 * const stream = skipWhile(even, source)
 */
export { skipWhile } from '@most/core'
