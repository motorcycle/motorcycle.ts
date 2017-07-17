/**
 * Retain only events for which a predicate is truthy.
 * 
 * @name filter<A>(predicate: (value: A) => boolean, stream: Stream<A>): Stream<A>
 * @example
 * import { filter, observe } from '@motorcycle/stream'
 * 
 * const source = // ---true---false---true---|
 * 
 * // resulting stream only contains truthy values
 * const stream = filter(Boolean, source)
 * 
 * observe(console.log, stream)
 * // true
 * // true
 */
export { filter } from '@most/core'
