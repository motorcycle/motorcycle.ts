import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { drop } from './drop'

export const test: Test = describe('drop',
  given('a number and an array',
    it('removes n number of items from the beginning of the array', () => {
      const array = [ 1, 2, 3, 4, 5 ]
      const n = 2

      eq(drop(n, array), [ 3, 4, 5 ])
      eq(drop(5, array), [])
      eq(drop(100, array), [])
    })
  ),

  given('a number and a string',
    it('slices the string', () => {
      eq<any>(drop(2, 'foo'), 'o')
      eq<any>(drop(500, 'foo'), '')
    })
  )
)
