// tslint:disable:no-magic-numbers
import { assert } from '@briancavalier/assert'
import { describe, given, it } from '@typed/test'

import { and } from './and'

describe(`and`,
  given(`true -> true`,
    it(`-> true`, () => {
      assert(and(true, true))
    })
  ),

  given(`true -> false`,
    it(`-> false`, () => {
      assert(!and(true, false))
    })
  ),

  given(`false -> true`,
    it(`-> false`, () => {
      assert(!and(false, true))
    })
  ),

  given(`false -> false`,
    it(`-> false`, () => {
      assert(!and(false, false))
    })
  )
)
