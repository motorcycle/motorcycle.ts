import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { unnest } from './unnest'

export const test: Test = describe('unnest',
  given('[ a | [a] ]',
    it('-> [a]', () => {
      eq(unnest([ 1, [ 1, 2 ], 3 ]), [ 1, 1, 2, 3 ])
    })
  )
)
