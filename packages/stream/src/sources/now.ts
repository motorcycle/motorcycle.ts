/**
 * Create a stream containing a single event at time 0
 *
 * @name now<A>(value: A): Stream<A>
 * @example
 * import { now, observe } from '@motorcycle/stream'
 *
 * const stream = now(1)
 *
 * observe(console.log, stream)
 * // 1
 */
export { now } from '@most/core'
