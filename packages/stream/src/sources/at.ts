/**
 * Create a stream containing a single event at a specific time.
 * 
 * @name at<A>(time: number, value: A): Stream<A>
 * @example
 * import { at, observe } from '@motorcycle/stream'
 * 
 * observe(console.log, at(1000, 'Hello'))
 * // After 1 second
 * // logs 'Hello'
 */
export { at } from '@most/core'
