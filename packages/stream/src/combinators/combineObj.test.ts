import { Test, describe, given, it } from '@typed/test'

import { combineObj } from './combineObj'
import { now } from '../sources'
import { observe } from './observe'

export const test: Test = describe(`combineObj`, [
  given(`an object of stream`, [
    it(`returns a stream of object`, ({ equal }) => {
      const obj = {
        a: now(1),
        b: now(2),
        c: now(3),
      }

      const stream = combineObj(obj)

      const expected = { a: 1, b: 2, c: 3 }

      return observe(equal(expected), stream)
    }),
  ]),
])
