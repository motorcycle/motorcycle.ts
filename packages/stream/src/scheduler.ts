import { Scheduler } from '@motorcycle/types'
import { newDefaultScheduler } from '@most/scheduler'

/**
 * A shared instance of the default scheduler from @most/scheduler
 * 
 * @name scheduler (Scheduler)
 * @example
 * import { scheduler, now } from '@motorcycle/stream'
 * 
 * const stream = now(1)
 * 
 * const sink = {
 *   event(time: number, value: number) { ... },
 *   error(time: number, err: Error) { ... },
 *   end(time: number) { ... }
 * }
 * 
 * const disposable = stream.run(sink, scheduler)
 * 
 * // later 
 * disposable.dispose()
 */
export const scheduler: Scheduler = newDefaultScheduler()
