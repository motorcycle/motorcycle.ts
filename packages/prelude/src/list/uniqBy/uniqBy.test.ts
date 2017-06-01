import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { uniqBy } from './uniqBy'

export const test: Test = describe('uniqBy',
  given('(a -> b) -> [a]',
    it('-> [a]', () => {
      const list = [ -1, -5, 2, 10, 1, 2 ]

      eq(uniqBy(Math.abs, list), [ -1, -5, 2, 10 ])
    })
  )
)
