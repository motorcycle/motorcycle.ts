import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { reduceWhile } from './reduceWhile'

export const test: Test = describe(
  'reduceWhile',
  given(
    '(b -> a -> boolean) -> (b -> a -> b) -> b -> [a]',
    it('-> b', () => {
      const add = (x: number, y: number) => x + y
      const isOdd = (_: any, x: number) => x % 2 === 1

      eq(reduceWhile(isOdd, add, 0, [1, 3, 5, 60, 777, 800]), 9)
      eq(reduceWhile(isOdd, add, 111, [2, 4, 6]), 111)
    })
  )
)
