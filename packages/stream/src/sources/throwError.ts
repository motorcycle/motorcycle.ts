/**
 * Create a stream in the error state. 
 * This can be useful for functions that need to return a stream, but need to 
 * signal an error.
 * 
 * @name throwError(err: Error): Stream<never>
 * @example
 * import { throwError, chain, now } from '@motorcycle/stream'
 * 
 * const f = (x: Maybe<number>): Stream<number> => isNothing(x)
 *  ? throwError(new Error('cannot be given Nothing'))
 *  : now(fromJust(x)) 
 * 
 * const stream = chain(f, maybe$)
 */
export { throwError } from '@most/core'
