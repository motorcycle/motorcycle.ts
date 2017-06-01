import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { dropLast } from './dropLast'

export const test: Test = describe('dropLast',
  given('a number and an array',
    it('removes n number of items from the end of the array', () => {
      const array = [ 1, 2, 3, 4, 5 ]
      const n = 2

      eq(dropLast(n, array), [ 1, 2, 3 ])
      eq(dropLast(5, array), [])
      eq(dropLast(100, array), [])
    })
  ),

  describe('given a number and a string',
    it('slices the string', () => {
      eq<any>(dropLast(2, 'foo'), 'f')
      eq<any>(dropLast(500, 'foo'), '')
    })
  )
)
