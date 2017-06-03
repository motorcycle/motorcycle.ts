import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { update } from './update'

export const test: Test = describe(
  'update',
  given(
    'int -> a -> [a]',
    it('-> a', () => {
      const list = [1, 2, 3, 4, 5, 6, 7, 8]

      eq(update(-1, 1, list), list)
      eq(update(20, 1, list), list)
      eq(update(8, 9, list), list)
      eq(update(0, 10, list), [10, 2, 3, 4, 5, 6, 7, 8])
      eq(update(0, 1, []), [])
    })
  )
)
