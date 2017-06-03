import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'
import { ascend } from './ascend'

export const test: Test = describe(
  `ascend`,
  given(
    `(a -> b) -> a -> a`,
    it(`returns an integer`, () => {
      const a = { a: 1 }
      const b = { a: 2 }
      const byA = (obj: { a: number }) => obj.a

      eq(ascend(byA, a, b), -1)
      eq(ascend(byA, b, a), 1)
      eq(ascend(byA, a, a), 0)
    })
  )
)
