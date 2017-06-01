import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { mergeAll } from './mergeAll'

export const test: Test = describe('mergeAll',
  given('[{ K: V}]',
    it('-> { K: V }', () => {
      const actual = mergeAll([ { a: 1 }, { b: 2 }, { c: 3 } ])

      const expected = { a: 1, b: 2, c: 3 }

      eq(actual, expected)
    })
  )
)
