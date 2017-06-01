import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { forEach } from './forEach'

export const test: Test = describe('forEach',
  given('a function and an array',
    it('executes the function on each element in the array, returning the original array', () => {
      const array = [ 1, 2, 3 ]

      let run = 0

      const f = () => ++run

      eq(array, forEach(f, array))
      eq(run, 3)
    })
  )
)
