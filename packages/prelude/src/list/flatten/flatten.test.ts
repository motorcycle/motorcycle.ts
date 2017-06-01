import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { flatten } from './flatten'

export const test: Test = describe('flatten',
  given('an array of arrays',
    it('retuns an unnested array', () => {
      const arr = [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ [ [ 7, 8 ] ] ] ]

      eq(flatten(arr), [ 1, 2, 3, 4, 5, 6, 7, 8 ])
    })
  )
)
