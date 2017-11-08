/**
 * Creates a new Stream containing events from both streams.
 *
 * @name merge<A>(a: Stream<A>, b: Stream<A>): Stream<A>
 * @example
 * import { merge, at, observe } from '@motorcycle/stream'
 *
 * const stream = merge(at(1000, 'World'), at(100, 'Hello'))
 *
 * observe(console.log, stream)
 * // Hello -- at time 100
 * // World -- at time 1000
 */
export { merge } from '@most/core'
