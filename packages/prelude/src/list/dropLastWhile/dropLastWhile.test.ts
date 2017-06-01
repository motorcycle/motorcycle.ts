import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { dropLastWhile } from './dropLastWhile'

export const test: Test = describe('dropLastWhile',
  given('a number and an array',
    it('removes n number of items from the end of the array', () => {
      const array = [ 1, 2, 3, 4, 5 ]
      const f = (x: number) => x > 3

      eq(dropLastWhile(f, array), [ 1, 2, 3 ])
      eq(dropLastWhile(f, [ 1, 2, 3, 4, 5, 2, 3, 4, 5 ]), [ 1, 2, 3, 4, 5, 2, 3 ])
    })
  )
)
