import { assert, eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { fromJust, isJust, just, nothing } from '../../maybe'

import { reduce } from './reduce'

export const test: Test = describe(
  `reduce`,
  given(
    `(b -> a -> b) -> b -> Maybe a`,
    it(`-> Just b`, () => {
      const maybeJust = just(1)
      const maybeNothing = nothing()

      const reducer = (acc: number, x: number) => acc + x

      assert(isJust(reduce(reducer, 10, maybeJust)))
      assert(isJust(reduce(reducer, 10, maybeNothing)))

      const valueJust = fromJust(reduce(reducer, 10, maybeJust))
      const valueNothing = fromJust(reduce(reducer, 10, maybeNothing))

      eq(valueJust, 11)
      eq(valueNothing, 10)
    })
  )
)
