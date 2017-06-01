import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'
import { bind } from './bind'

export const test: Test = describe(`bind`,
  given(`a function`,
    it(`returns a function bound to given 'this'`, () => {
      const x = { a: 1 }

      // tslint:disable-next-line:no-invalid-this
      const f = function () { eq(this, x) }

      const g = bind(f, x)

      g.call(x)
    })
  )
)
