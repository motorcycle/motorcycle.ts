import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { adjust } from './adjust'

export const test: Test = describe(`adjust`,
  given('a function (a -> a), an index, and a list',
    it('returns a new list with new value at given index', () => {
      const f = (a: number) => a + 1
      const index = 1
      const list = [ 0, 1, 2 ]

      eq(adjust(f, index, list), [ 0, 2, 2 ])
    })
  )
)
