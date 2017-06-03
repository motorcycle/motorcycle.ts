import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { join } from './join'

export const test: Test = describe(
  'join',
  given(
    'string -> List a',
    it('returns a string', () => {
      eq(join(' ', ['a', 'b', 'c']), 'a b c')
      eq(join(' ')([]), '')
    })
  )
)
