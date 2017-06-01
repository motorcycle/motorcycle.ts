import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { find } from './find'

export const test: Test = describe('find',
  given('a predicate and an array',
    it('returns the first matching element', () => {
      eq(find((x: number) => x < 5, [ 1, 2, 3, 4, 5 ]), 1)
    }),

    it('returns void when there are no matches', () => {
      eq(find((x: number) => x === 0, [ 1, 2, 3, 4, 5 ]), void 0)
    })
  )
)
