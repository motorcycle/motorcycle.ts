import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'
import { binary } from './binary'

const ARITY2_LENGTH = 2
export const test: Test = describe(`binary`,
  given(`a function of arity 1`,
    it(`returns a function of arity 2`, () => {
      const f = (a: number) => a

      const g = binary(f)

      eq(ARITY2_LENGTH, g.length)
    })
  )
)
