import { assert } from '@briancavalier/assert'
import { Test, describe, it } from '@typed/test'

import { contains } from './contains'

export const test: Test = describe('contains',
  it('returns true when given a value an array contains', () => {
    assert(contains(1, [ 2, 3, 1 ]))
  }),

  it('returns false when given a value not contained in an array', () => {
    assert(!contains(1, [ 2, 3, 4 ]))
  })
)
