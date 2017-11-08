/**
 * Creates a new stream containing all events of underlying streams.
 *
 * @name mergeArray<A>(stream: Array<Stream<A>>): Stream<A>
 * @example
 * import { at, mergeArray, observe } from '@motorcycle/stream'
 *
 * const stream = mergeArray([
 *   at(100, 'foo'),
 *   at(300, 'baz')
 *   at(200, 'bar'),
 * ])
 *
 * observe(console.log, stream)
 * // foo -- at time 100
 * // bar -- at time 200
 * // baz -- at time 300
 */
export { mergeArray } from '@most/core'
