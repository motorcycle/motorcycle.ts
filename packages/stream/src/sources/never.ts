/**
 * Create a stream containing no events, which never ends.
 * 
 * @name never<A>(): Stream<A>
 * @example 
 * import { never, drain } from '@motorcycle/stream'
 * 
 * const stream = never()
 * 
 * drain(stream) // Returns a promise that never fulfills.
 */
export { never } from '@most/core'
