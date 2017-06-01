import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { curry2 } from '../curry'
import { memoize } from './memoize'

export const test: Test = describe('memoize',
  given('a function',
    it('returns a memoized function', () => {
      let called = 0

      function f(a: number, b: number) {
        called += 1

        return a + b
      }

      const mf = memoize(f)

      eq(mf(1, 2), 3)
      eq(mf(1, 2), 3)

      eq(called, 1)
    })
  ),

  given('a curried function',
    it('returns a curried memoized function', () => {
      let called = 0

      function f(a: number, b: number) {
        called += 1

        return a + b
      }

      const c = curry2(f)

      const mf = memoize(c)

      eq(mf(1)(2), 3)
      eq(mf(1)(2), 3)

      eq(called, 1)
    })
  )
)
