/**
 * Prepends an event to a stream at time 0.
 * 
 * @name startWith<A>(initialValue: A, stream: Stream<A>): Stream<A>
 * @example 
 * import { startWith, at, observe } from '@motorcycle/stream'
 * 
 * const stream = startWith('Hello', at(1000, 'world'))
 * 
 * observe(console.log, stream)
 * // At time 0 logs 'Hello'
 * // At time 1000 logs 'world'
 */
export { startWith } from '@most/core'
