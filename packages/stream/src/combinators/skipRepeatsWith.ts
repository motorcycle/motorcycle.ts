/**
 * Remove adjacent repeated events, using the provided equality function to compare adjacent events.:
 * 
 * @name skipRepeatsWith<A>(predicate: (a: A, b: A) => boolean, stream: Stream<A>): Stream<A>
 * @example
 * import { skipRepeatsWith, observe } from '@motorcycle/stream'
 *  
 * const source = // --a-b-B-c-D-d-e->
 * 
 * const equalsIgnoreCase = (a: string, b: string) =>
 *  a.toLowerCase() === b.toLowerCase()
 * 
 * const stream = skipRepeatsWith(equalsIgnoreCase, source)
 * 
 * observe(console.log, stream)
 * // a
 * // b
 * // c
 * // D
 * // e
 */
export { skipRepeatsWith } from '@most/core'
