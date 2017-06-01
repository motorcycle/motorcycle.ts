import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { insert } from './insert'

export const test: Test = describe('insert',
  given('int -> a -> List a',
    it('returns List a', () => {
      eq(insert(2, 3, [ 1, 2, 4 ]), [ 1, 2, 3, 4 ])
    })
  )
)
