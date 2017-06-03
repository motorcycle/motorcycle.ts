import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { aperture } from './aperture'

export const test: Test = describe(
  'aperture',
  given(
    'a aperture of 2 and [0, 1, 2, 3]',
    it('returns [[0, 1], [1, 2], [2, 3]]', () => {
      eq<any>(aperture(2, [0, 1, 2, 3]), [[0, 1], [1, 2], [2, 3]])
    })
  ),
  given(
    'an aperture of 3 and [1, 2, 3, 4, 5]',
    it('returns [[1, 2, 3], [2, 3, 4], [3, 4, 5]]', () => {
      eq<any>(aperture(3, [1, 2, 3, 4, 5]), [[1, 2, 3], [2, 3, 4], [3, 4, 5]])
    })
  ),
  given(
    'an aperture greater than the length of given list',
    it('returns an empty list', () => {
      eq(aperture(100, [1, 2, 3, 4, 5]), [])
      eq(aperture(2, [1]), [])
    })
  )
)
