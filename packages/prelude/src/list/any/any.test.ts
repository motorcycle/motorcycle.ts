import { assert } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { any } from './any'

export const test: Test = describe('any',
  given('a predicate and a list with 1 value matching predicate',
    it('returns true', () => {
      const f = (x: number) => x === 1
      const list = [ 0, 2, 3, 1 ]

      assert(any(f)(list))
    })
  ),

  given('a predicate and a list with no matches ',
    it('returns false', () => {
      const f = (x: number) => x === 1
      const list = [ 2, 2, 2, 3, 3 ]
      assert(!any(f)(list))
    })
  )
)
