/**
 * Creates a new stream that upon each event performs a side-effect.
 * 
 * @name tap<A>(f: (value: A) => any, stream: Stream<A>): Stream<A>
 * @example
 * import { tap, drain } from '@motorcycle/stream'
 * 
 * const logStream = tap(console.log, stream)
 * 
 * drain(logStream)
 */
export { tap } from '@most/core'
