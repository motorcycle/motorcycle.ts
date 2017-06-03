import { assert, eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { isJust, just, nothing } from '../../maybe'

import { map } from './map'

export const test: Test = describe(
  'map',
  given(
    '(a -> b) -> List a',
    it('-> [b]', () => {
      eq(map((x: number) => x + 1, [1, 2, 3]), [2, 3, 4])
    })
  ),
  given(
    '(a -> b) -> Maybe a',
    it('-> Just b', () => {
      const maybe = just(1)
      const f = (x: number) => x + 1

      assert(isJust(map(f, maybe)))
      assert(!isJust(map(f, nothing())))
    })
  )
)
