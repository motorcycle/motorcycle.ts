import { assert } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'
import { construct } from './construct'

export const test: Test = describe(
  `construct`,
  given(
    `a class with a constructor of arity 2`,
    it(`returns a curried function to construct the class`, () => {
      class Foo {
        private a: number
        private b: number
        constructor(a: number, b: number) {
          this.a = a
          this.b = b
        }
      }

      const foo = construct(Foo)

      assert(foo(1)(1) instanceof Foo)
    })
  )
)
