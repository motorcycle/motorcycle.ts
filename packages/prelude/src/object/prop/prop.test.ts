// tslint:disable:no-magic-numbers
import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { prop } from './prop'

export const test: Test = describe(
  'prop',
  given(
    'K -> { K: V }',
    it('-> V', () => {
      eq(prop('a', { a: 1 }), 1)
      eq(prop<{ a: 1 }>('a')({ a: 1 }), 1)
    })
  )
)
