import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { reverse } from './reverse'

export const test: Test = describe(
  'reverse',
  given(
    '[a]',
    it('-> a', () => {
      eq(reverse([3, 2, 1]), [1, 2, 3])
    })
  )
)
