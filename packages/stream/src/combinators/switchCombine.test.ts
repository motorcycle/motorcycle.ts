import { Test, describe, given, it } from '@typed/test'

import { now } from '../sources'
import { observe } from './observe'
import { switchCombine } from './switchCombine'

export const test: Test = describe(`switchCombine`, [
  given(`a stream of array of streams`, [
    it(`returns a stream of array of values`, ({ equal }) => {
      const a = now(1)
      const b = now(2)
      const c = now(3)
      const d = now(4)

      const streamList$ = now([a, b, c, d])

      return observe(equal([1, 2, 3, 4]), switchCombine(streamList$))
    }),

    it(`returns an empty array if items are empty`, ({ equal }) => {
      const streamList$ = now([])

      return observe(equal([]), switchCombine(streamList$))
    }),
  ]),
])
