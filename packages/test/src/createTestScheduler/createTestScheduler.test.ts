import { Test, describe, it } from '@typed/test'

import { Sink } from '@motorcycle/types'
import { createTestScheduler } from './createTestScheduler'
import { delay } from '@most/scheduler'
import { propagateEventTask } from '@most/core'

export const test: Test = describe(`createTestScheduler`, [
  describe(`TestScheduler`, [
    it(`returns time starting from 0`, ({ equal }) => {
      const { scheduler } = createTestScheduler()

      equal(0, scheduler.currentTime())
    }),

    describe(`tick`, [
      it(`increases time after running tasks`, ({ equal }, done) => {
        const { tick, scheduler } = createTestScheduler()
        const delayTime = 100
        const expectedValue = 500

        const sink: Sink<number> = {
          event(time, value) {
            equal(delayTime, time)
            equal(expectedValue, value)
            equal(delayTime, scheduler.currentTime())
            done()
          },
          error(_, err) {
            done(err)
          },
          end() {},
        }

        delay(delayTime, propagateEventTask(expectedValue, sink), scheduler)

        tick(delayTime)
      }),
    ]),
  ]),
])
