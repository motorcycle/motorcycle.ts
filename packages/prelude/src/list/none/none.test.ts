import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { none } from './none'

export const test: Test = describe('none',
  given('(a -> boolean) -> [a]',
    it('-> boolean', () => {
      const isEven = (n: number) => n % 2 === 0

      eq(none(isEven, [ 1, 3, 5, 7, 9, 11 ]), true) // => true
      eq(none(isEven, [ 1, 3, 5, 7, 8, 11 ]), false) // => false
    })
  )
)
