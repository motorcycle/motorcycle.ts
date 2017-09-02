import { delay, map, now, switchLatest } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'

// Randomly delays stream to simulate asynchronous loading
export function simulateLoading<A>(stream: Stream<A>): Stream<A> {
  return switchLatest(map(value => delay(Math.random() * 2000, now(value)), stream))
}
