import { assert } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { all } from './all'

export const test: Test = describe('all',
  given('a function and a list of a single value',
    it('returns true', () => {
      const f = (x: number) => x === 1
      const list = [ 1, 1, 1, 1, 1 ]

      assert(all(f)(list))
    })
  ),

  given('a function and a list of a multiple values',
    it('returns false', () => {
      const f = (x: number) => x === 1
      const list = [ 1, 1, 1, 2, 1 ]

      assert(!all(f)(list))
    })
  )
)
