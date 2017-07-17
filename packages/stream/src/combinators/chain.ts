/**
 * Creates a new stream by applying a stream-returning function to every event 
 * value and merging them into the resulting stream.
 * 
 * @name chain<A, B>(f: (value: A) => Stream<B>, stream: Stream<A>): Stream<B>
 * @example
 * import { chain, now, observe } from '@motorcycle/stream'
 * 
 * const stream = chain(x => now(x * 2), now(1000))
 * 
 * observe(console.log, stream) 
 * // 2000
 */
export { chain } from '@most/core'
