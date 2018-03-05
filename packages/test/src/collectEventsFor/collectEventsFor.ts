import { Delay, Stream } from '@motorcycle/types'
import { runEffects, tap } from '@motorcycle/stream'

import { createTestScheduler } from '../createTestScheduler'
import { curry2 } from '@typed/functions'

/**
 * Collects events for a given amount of time.
 * @name collectEventsFor<A>(delay: Delay, stream: Stream<A>): Promise<ReadonlyArray<A>>
 * @example
 * // Mocha style tests
 * it('increasing value by one', () => {
 *   const stream = scan(x => x + 1, skip(1, periodic(10)))
 *
 *   return collectEventsFor(30, stream).then(events => assert.deepEqual(events, [0, 1, 2, 3]))
 * })
 */
export const collectEventsFor: CollectEventsFor = curry2<
  Delay,
  Stream<any>,
  Promise<ReadonlyArray<any>>
>(function collectEventsFor<A>(delay: Delay, stream: Stream<A>) {
  const { tick, scheduler } = createTestScheduler()

  const eventList: Array<A> = []

  runEffects(tap(a => eventList.push(a), stream), scheduler)

  return tick(delay).then(() => eventList.slice())
})

export interface CollectEventsFor {
  <A>(n: Delay, s: Stream<A>): Promise<ReadonlyArray<A>>
  (n: Delay): <A>(s: Stream<A>) => Promise<ReadonlyArray<A>>
  <A>(n: Delay): (s: Stream<A>) => Promise<ReadonlyArray<A>>
}
