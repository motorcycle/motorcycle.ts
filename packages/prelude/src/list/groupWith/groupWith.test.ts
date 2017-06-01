import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { equals } from '../../relation/equals'
import { groupWith } from './groupWith'

export const test: Test = describe('groupWith',
  given('(a -> a -> boolean) -> List a',
    it('returns array of grouped arrays', () => {
      const array = [ 0, 1, 1, 2, 3, 5, 8, 8, 13, 21, 25, 25 ]
      const expected = [ [ 0 ], [ 1, 1 ], [ 2 ], [ 3 ], [ 5 ], [ 8, 8 ], [ 13 ], [ 21 ], [ 25, 25 ] ]

      eq(groupWith(equals, array), expected)
    })
  )
)
