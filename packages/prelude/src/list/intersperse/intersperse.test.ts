import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { intersperse } from './intersperse'

export const test: Test = describe(
  'intersperse',
  given(
    'a -> List a',
    it('returns List a', () => {
      eq(intersperse(10, [1, 2, 3]), [1, 10, 2, 10, 3])
    })
  )
)
