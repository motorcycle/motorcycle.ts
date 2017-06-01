import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { slice } from './slice'

export const test: Test = describe('slice',
  given('int -> int -> [a]',
    it('-> [a]', () => {
      const list = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

      eq(slice(0, 10, list), list)
      eq(slice(5, 5, list), [ ])
      eq(slice(1, 2, list), [ 2 ])
    })
  ),

  given('int -> int -> string',
    it('-> string', () => {
      const str = 'hello'

      eq(slice(1, 2, str), 'e')
    })
  )
)
