/**
 * Creates a new stream by lazily applying a stream-returning function
 * to each event value of a stream concatenating that stream's values to the
 * resulting stream.
 *
 * @name concatMap<A, B>(f: (value: A) => Stream<B>, stream: Stream<A>): Stream<B>
 * @example
 * import { concatMap, now, observe } from '@motorcycle/stream'
 *
 * const source = // --104--101--108--108--111|
 *
 * const f = (x: number) => now(String.fromCharCode(x))
 *
 * const stream = concatMap(f, source)
 *
 * observe(console.log, stream)
 * // h
 * // e
 * // l
 * // l
 * // o
 */
export { concatMap } from '@most/core'
