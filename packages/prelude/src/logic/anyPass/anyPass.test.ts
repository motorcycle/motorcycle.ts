// tslint:disable:no-magic-numbers
import { assert } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { anyPass } from './anyPass'

export const test: Test = describe(
  `anyPass`,
  given(
    `[(a -> boolean)] -> a`,
    it(`-> boolean`, () => {
      const value = 1

      const t = () => true
      const f = () => false

      assert(anyPass([t, t, t], value))
      assert(anyPass([f, f, f, f, t])(value))
      assert(!anyPass([f, f, f], value))
    })
  )
)
