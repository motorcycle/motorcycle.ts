import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { findLastIndex } from './findLastIndex'

export const test: Test = describe('findIndex',
  given('a predicate and an array',
    it('returns the first matching element', () => {
      eq(findLastIndex((x: number) => x < 5, [ 1, 2, 3, 4, 5 ]), 3)
    }),

    it('returns void when there are no matches', () => {
      eq(findLastIndex((x: number) => x === 0, [ 1, 2, 3, 4, 5 ]), -1)
    })
  )
)
