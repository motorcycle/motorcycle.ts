import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { insertAll } from './insertAll'

export const test: Test = describe('insert',
  given('int -> a -> List a',
    it('returns List a', () => {
      eq(insertAll(2, [ 3, 3, 3 ], [ 1, 2, 4 ]), [ 1, 2, 3, 3, 3, 4 ])
    })
  )
)
