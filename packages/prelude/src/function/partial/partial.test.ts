// tslint:disable:max-file-line-count
import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { __, partial } from './partial'

export const test: Test = describe(
  `partial`,
  given(
    `a function of Arity 0`,
    it('returns a function of arity 0', () => {
      const foo = () => 1
      const partialFoo = partial(foo, [])

      eq(partialFoo(), 1)
    })
  ),
  given(
    `a function of Arity 1 and no args`,
    it(`returns a function of arity 1`, () => {
      const foo = (a: number) => a
      const partialFoo = partial(foo, [])

      eq(partialFoo(1), 1)
      eq(partialFoo(2), 2)
    })
  ),
  given(
    `a function of Arity 1 and 1 arg`,
    it(`returns a function of Arity 0`, () => {
      const foo = (a: number) => a
      const partialFoo = partial(foo, [1])

      eq(partialFoo(), 1)
      eq(partialFoo(), 1)
    })
  ),
  given(
    `a function of Arity 1 and 1 Placeholder`,
    it(`returns a function of Arity 1`, () => {
      const foo = (a: number) => a
      const partialFoo = partial(foo, [__])

      eq(partialFoo(1), 1)
    })
  ),
  given(
    `a function of Arity 2 and no args`,
    it(`returns a curried function`, () => {
      const foo = (a: number, b: number) => a + b
      const partialFoo = partial(foo, [])

      eq(partialFoo(1)(2), 3)
    })
  ),
  given(
    `a function of Arity 2 and 1 arg`,
    it(`returns a function of Arity 1`, () => {
      const foo = (a: number, b: number) => a + b
      const partialFoo = partial(foo, [1])

      eq(partialFoo(2), 3)
    })
  ),
  given(
    `a function of Arity2 and 1 placeholder and 1 arg`,
    it(`returns a function of Arity 1`, () => {
      const foo = (a: number, b: number) => a + b
      const partialFoo = partial(foo, [__, 100])

      eq(partialFoo(1), 101)
      eq(partialFoo(10), 110)
    })
  ),
  given(
    `a function of Arity 3 and 2 placeholders and 1 arg`,
    it(`returns a function of Arity 2`, () => {
      const foo = (a: number, b: number, c: number) => a + b + c
      const partialFoo = partial(foo, [__, __, 1])

      eq(partialFoo(10)(20), 31)
    })
  )
)
