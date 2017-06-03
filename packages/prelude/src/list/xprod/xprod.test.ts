import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { xprod } from './xprod'

export const test: Test = describe(
  'xprod',
  given(
    '[a] -> [b]',
    it('-> [ (a, b) ]', () => {
      const xs = [1, 2, 3]
      const ys = ['a', 'b', 'c']

      eq<any>(xprod(xs, ys), [
        [1, 'a'],
        [1, 'b'],
        [1, 'c'],
        [2, 'a'],
        [2, 'b'],
        [2, 'c'],
        [3, 'a'],
        [3, 'b'],
        [3, 'c'],
      ])
    })
  )
)
