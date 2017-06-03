import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { remove } from './remove'

export const test: Test = describe(
  'remove',
  given(
    'int -> int -> [a]',
    it('-> [a]', () => {
      eq(remove(2, 3, [1, 2, 3, 4, 5, 6, 7, 8]), [1, 2, 6, 7, 8])
      eq(remove(2, 3, [1, 2, 3, 4, 5, 6, 7, 8]).length, 5)
      eq(remove(2, 100, [1, 2, 3, 4]), [1, 2])
      eq(remove(2, 100, [1, 2, 3, 4]).length, 2)
      eq(remove(2, 1, [1, 2, 3]), [1, 2])
      eq(remove(2, 1, [1, 2, 3]).length, 2)
      eq(remove(0, 1, [1, 2, 3, 4]), [2, 3, 4])
      eq(remove(0, 1, [1, 2, 3, 4]).length, 3)
    })
  )
)
