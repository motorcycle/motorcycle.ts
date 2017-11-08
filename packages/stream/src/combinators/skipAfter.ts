/**
 * Discard all events after the first event for which predicate returns true.
 *
 * @name skipAfter<A>(predicate: (value: A) => boolean, stream: Stream<A>): Stream<A>
 * @example
 * import { skipAfter } from '@motorcycle/stream'
 *
 * const source = // --1-2-3-4-5-6-7-8->
 * //                --1-2|
 * const stream = skipAfter(even, source)
 */

export { skipAfter } from '@most/core'
