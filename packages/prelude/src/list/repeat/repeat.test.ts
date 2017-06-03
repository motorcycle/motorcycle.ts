import { eq } from '@briancavalier/assert'
import { Test, describe, it } from '@typed/test'

import { repeat } from './repeat'

export const test: Test = describe(
  'repeat',
  it('a -> int -> [a]', () => {
    eq(repeat(1, 0), [])
    eq(repeat(1, 5), [1, 1, 1, 1, 1])
  })
)
