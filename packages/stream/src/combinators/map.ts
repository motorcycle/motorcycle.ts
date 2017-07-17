/**
 * Apply a function to each event value of a stream, returning a new 
 * stream containing the returned values.
 * 
 * @name map<A, B>(f: (value: A) => B, stream: Stream<A>): Stream<B>
 * @example
 * import { map, now, observe } from '@motorcycle/stream'
 * 
 * const stream = map(x => x + 1, now(100))
 * 
 * observe(console.log, stream) // 101
 */
export { map } from '@most/core'
