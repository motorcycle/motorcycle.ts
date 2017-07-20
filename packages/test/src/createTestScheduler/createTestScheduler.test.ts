import { Test, describe, it } from '@typed/test'

import { Sink } from '@motorcycle/types'
import { createTestScheduler } from './createTestScheduler'
import { propagateEventTask } from '@most/core'

export const test: Test = describe(`createTestScheduler`, [
  describe(`TestScheduler`, [
    it(`returns time starting from 0`, ({ equal }) => {
      const { scheduler } = createTestScheduler()

      equal(0, scheduler.now())
    }),

    describe(`tick`, [
      it(`increases time after running tasks`, ({ equal }, done) => {
        const { tick, scheduler } = createTestScheduler()
        const delay = 100
        const expectedValue = 500

        const sink: Sink<number> = {
          event(time, value) {
            equal(delay, time)
            equal(expectedValue, value)
            equal(delay, scheduler.now())
            done()
          },
          error(_, err) {
            done(err)
          },
          end() {},
        }

        scheduler.delay(delay, propagateEventTask(expectedValue, sink))

        tick(delay)
      }),
    ]),
  ]),
])
