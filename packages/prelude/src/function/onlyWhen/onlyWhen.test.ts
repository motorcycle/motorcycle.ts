import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { id } from '..'
import { onlyWhen } from './onlyWhen'

export const test: Test = describe(`onlyWhen`,
  given(`a predicate that is false`,
    it(`returns default value`, () => {
      const expected = 0
      const actual = onlyWhen((_: number) => false, expected, id, 1)
      eq(actual, expected)
    })
  ),

  given(`a predicate that is true`,
    it(`returns f a`, () => {
      const a = 1
      const expected = 2
      const actual = onlyWhen((x: number) => x === a, 0, (x: number) => x + 1, a)
      eq(actual, expected)
    })
  )
)
