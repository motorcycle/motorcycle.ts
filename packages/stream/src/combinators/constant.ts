/**
 * Replace each event on a stream with a given value.
 *
 * @name constant<A>(value: A, stream: Stream<any>): Stream<A>
 * @example
 * import { constant, periodic, observe } from '@motorcycle/stream'
 *
 * const stream = constant(100, periodic(1000))
 *
 * observe(console.log, stream) // every 1 second logs 100
 */
export { constant } from '@most/core'
