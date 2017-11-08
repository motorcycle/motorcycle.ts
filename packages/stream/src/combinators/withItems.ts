/**
 * Creates a new stream by associating event times with
 * values from an array. The resulting stream will end when all array values
 * have been used or when the underlying stream ends.
 *
 * @name withItems<A>(array: Array<A>, stream: Stream<any>): Stream<A>
 * @example
 * import { withItems, periodic, observe } from '@motorcycle/stream'
 *
 * const stream = withItems([ 1, 2, 3 ], periodic(100))
 *
 * observe(console.log, stream)
 * // 1 -- time 0
 * // 2 -- time 100
 * // 3 -- time 200
 */
export { withItems } from '@most/core'
