import { Test, describe, given, it } from '@typed/test'
import { empty, periodic, take } from '@most/core'

import { observe } from './observe'

export const test: Test = describe(`observe`, [
  given(`a function and a stream`, [
    it(`returns a promise`, ({ equal }) => {
      return observe(() => {}, empty()).then(() => equal(1, 1))
    }),

    it(`calls function for each event in stream`, ({ equal }) => {
      let called = 0

      const f = () => {
        called++
      }

      return observe(f, take(3, periodic(0))).then(() => equal(3, called))
    }),
  ]),
])
