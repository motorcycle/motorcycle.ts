import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { dropWhile } from './dropWhile'

export const test: Test = describe(
  'dropWhile',
  given(
    'a number and an array',
    it('removes n number of items from the beginning of the array', () => {
      const array = [1, 2, 3, 4, 5]
      const f = (x: number) => x < 3

      eq(dropWhile(f, array), [3, 4, 5])
      eq(dropWhile(f, [1, 2, 3, 4, 5, 2, 3, 4, 5]), [3, 4, 5, 2, 3, 4, 5])
    })
  )
)
