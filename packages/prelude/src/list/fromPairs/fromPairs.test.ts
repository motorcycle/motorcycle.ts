import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { fromPairs } from './fromPairs'

export const test: Test = describe(
  'fromPairs',
  given(
    'an array of key/value pairs',
    it('returns an object containing those key/value pairs', () => {
      const map = new Map([[1, 1], [2, 2], [3, 3]])
      const pairs = Array.from(map)

      eq(fromPairs(pairs), { 1: 1, 2: 2, 3: 3 })
    })
  )
)
