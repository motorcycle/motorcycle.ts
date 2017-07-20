import { Test, describe, given, it } from '@typed/test'
import { periodic, scan, skip } from '@motorcycle/stream'

import { collectEventsFor } from './collectEventsFor'

export const test: Test = describe(`collectEvents`, [
  given(`a delay and a Stream`, [
    it(`returns Promise of Streams events up to that delay time`, ({ equal }) => {
      const stream = scan(x => x + 1, 0, skip(1, periodic(10)))

      return collectEventsFor(30, stream).then(equal([0, 1, 2, 3]))
    }),
  ]),
])
