import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { range } from './range'

export const test: Test = describe(
  'range',
  given(
    'int -> int',
    it('-> [int]', () => {
      eq(range(1, 5), [1, 2, 3, 4, 5])
    })
  )
)
