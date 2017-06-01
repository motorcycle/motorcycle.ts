import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { prepend } from './prepend'

export const test: Test = describe('prepend',
  given('a -> [a]',
    it('-> [a]', () => {
      eq(prepend(1, [ 2, 3, 4 ]), [ 1, 2, 3, 4 ])
    })
  )
)
