import { assert, eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'
import { gt, lt } from '../../relation/equality'
import { both } from './both'

export const test: Test = describe(`both`,
  it(`returns a function`, () => {
    const lt10AndGt5 = both(lt(10), gt(5))

    eq(typeof lt10AndGt5, 'function')
  }),

  given(`2 functions of arity 1`,
    it(`returns true if both functions return true`, () => {
      const lt10AndGt5 = both(lt(10), gt(5))

      assert(lt10AndGt5(7))
    }),

    it(`returns false if one function returns false`, () => {
      const lt10AndGt5 = both(lt(10), gt(5))

      assert(!lt10AndGt5(11))
    })
  )
)
