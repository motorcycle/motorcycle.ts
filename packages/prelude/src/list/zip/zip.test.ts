import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { zip } from './zip'

export const test: Test = describe(
  'zip',
  given(
    '[a] -> [b]',
    it('-> [ (a, b) ]', () => {
      eq<ReadonlyArray<[number, string]>>(zip([1, 2, 3], ['a', 'b', 'c']), [
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ])

      eq<ReadonlyArray<[number, string]>>(zip([1, 2, 3, 4], ['a', 'b', 'c']), [
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ])

      eq<ReadonlyArray<[number, string]>>(zip([1, 2, 3], ['a', 'b', 'c', 'd']), [
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ])
    })
  )
)
