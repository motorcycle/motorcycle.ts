import { Delay, Scheduler, Timeline } from '@motorcycle/types'
import { newScheduler, newTimeline } from '@most/scheduler'

import { VirtualTimer } from './VirtualTimer'

/**
 * Creates a test scheduler. Using the test scheduler you are the master of time.
 *
 * @name createTestScheduler(timeline?: Timeline): TestScheduler
 * @example
 * import { createTestScheduler } from '@motorcycle/test'
 * import { now, runEffects } from '@motorcycle/stream'
 *
 * const { tick, scheduler } createTestScheduler()
 *
 * const stream = now(100)
 *
 * runEffects(stream, scheduler).then(() => console.log('done!'))
 *
 * // manually tick forward in time
 * // tick returns a Promise that resolves when all scheduled tasks have been run.
 * tick(100)
 */
export function createTestScheduler(timeline: Timeline = newTimeline()): TestScheduler {
  const timer = new VirtualTimer()

  const tick = (delay: Delay) => timer.tick(delay)

  const scheduler: Scheduler = newScheduler(timer, timeline)

  return { tick, scheduler }
}

/**
 * TestScheduler
 *
 * @name TestScheduler
 * @example
 * export type TestScheduler = {
 *   readonly tick: (delay: Delay) => Promise<void>
 *   readonly scheduler: Scheduler
 * }
 * @type
 */
export type TestScheduler = {
  readonly tick: (delay: Delay) => Promise<void>
  readonly scheduler: Scheduler
}
