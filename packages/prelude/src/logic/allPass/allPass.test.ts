// tslint:disable:no-magic-numbers
import { assert } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { allPass } from './allPass'

export const test: Test = describe(
  `allPass`,
  given(
    `[(a -> boolean)] -> a`,
    it(`-> boolean`, () => {
      const value = 1

      const t = () => true
      const f = () => false
      const g = (x: number) => x <= 1

      assert(allPass([t, t, t, g], value))
      assert(!allPass([t, t, t, f], value))
      assert(!allPass([f])(value))
    })
  )
)
