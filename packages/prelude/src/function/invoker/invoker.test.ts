import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { invoker } from './'

export const test: Test = describe('invoker',
  given('an arity, method name, and object',
    it('returns a curried function that calls a object method', () => {
      const obj = { foo: (a: number, b: number): number => a + b }

      const foo = invoker<number, number, number, typeof obj>(2, 'foo', obj)

      eq(obj.foo(1, 2), foo(1)(2))
    })
  )
)
