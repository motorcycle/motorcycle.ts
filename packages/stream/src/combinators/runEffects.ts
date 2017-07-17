/**
 * Activate an event stream, and consume all its events.
 * 
 * @name runEffects<A>(stream: Stream<A>, scheduler: Scheduler): Promise<void>
 * @example 
 * import { runEffects, tap } from '@motorcycle/stream'
 * import { newDefaultScheduler } from '@most/scheduler'
 * 
 * const logStream = tap(console.log, stream)
 * 
 * runEffects(logStream, newDefaultScheduler())
 *  .then(() => console.log('complete'))
 *  .catch(err => console.error(err))
 */
export { runEffects } from '@most/core'
