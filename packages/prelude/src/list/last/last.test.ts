import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { last } from './last'

export const lastTest: Test = describe(
  'last',
  given(
    'str',
    it('-> str', () => {
      eq(last('abc'), 'c')
      eq(last(''), '')
    })
  ),
  given(
    '[a]',
    it('-> a', () => {
      eq(last([1, 2, 3]), 3)
    })
  ),
  given(
    '[]',
    it('-> void', () => {
      eq(last([]), void 0)
    })
  )
)
