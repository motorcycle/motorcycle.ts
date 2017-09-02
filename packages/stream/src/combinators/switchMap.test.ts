import { Test, describe, given, it } from '@typed/test'

import { now } from '../sources'
import { observe } from './observe'
import { scan } from './scan'
import { skip } from './skip'
import { switchMap } from './switchMap'

export const test: Test = describe(`switchMap`, [
  given(`a function that returns a stream B and a stream A`, [
    it(`maps stream A to the function and flattens its return value`, ({ equal }) => {
      const a$ = now(1)
      const b$ = now(2)
      const f = (a: number) => scan((x, y) => x + y, a, b$)

      return observe(equal(3), skip(1, switchMap(f, a$)))
    }),
  ]),
])
