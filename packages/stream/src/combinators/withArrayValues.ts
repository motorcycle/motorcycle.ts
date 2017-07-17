/**
 * Creates a new stream by associating event times with 
 * values from an array. The resulting stream will end when all array values 
 * have been used or when the underlying stream ends.
 * 
 * @name withArrayValues<A>(array: Array<A>, stream: Stream<any>): Stream<A>
 * @example
 * import { withArrayValues, periodic, observe } from '@motorcycle/stream'
 * 
 * const stream = withArrayValues([ 1, 2, 3 ], periodic(100))
 * 
 * observe(console.log, stream)
 * // 1 -- time 0
 * // 2 -- time 100
 * // 3 -- time 200
 */
export { withArrayValues } from '@most/core'
