import { Test, describe, given, it } from '@typed/test'

import { VirtualTimer } from './VirtualTimer'

export const test: Test = describe(`VirtualTimer`, [
  it(`is a Timer`, ({ equal }) => {
    const timer = new VirtualTimer()

    equal('function', typeof timer.now)
    equal('number', typeof timer.now())
    equal('function', typeof timer.setTimer)
    equal('function', typeof timer.clearTimer)
  }),

  describe(`tick`, [
    given(`a delay time`, [
      it(`ticks time forward by delay after running tasks`, ({ equal }) => {
        const timer = new VirtualTimer()
        const delay = 100

        timer.setTimer(() => void 0, delay)

        return timer.tick(delay).then(() => {
          equal(delay, timer.now())
        })
      }),
    ]),
  ]),

  describe(`setTimer`, [
    given(`a function and a delay`, [
      it(`returns a handle`, ({ notEqual }) => {
        const timer = new VirtualTimer()

        const handle = timer.setTimer(() => {}, 0)

        notEqual(void 0, handle)
      }),
    ]),
  ]),

  describe(`clearTimer`, [
    given(`a handle`, [
      it(`cancels the task`, ({ ok }, done) => {
        const timer = new VirtualTimer()

        const handle = timer.setTimer(() => done(new Error('Foo')), 0)

        timer.clearTimer(handle)

        timer.tick(100).then(() => {
          ok(true)
          done()
        })
      }),
    ]),
  ]),
])
