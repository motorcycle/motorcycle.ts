import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { nth } from './nth'

export const test: Test = describe(
  'nth',
  given(
    'int -> [a]',
    it('-> a | void', () => {
      const list = ['foo', 'bar', 'baz', 'quux']

      eq(nth(1, list), 'bar') // => 'bar'
      eq(nth(-1, list), 'quux') // => 'quux'
      eq(nth(-99, list), void 0) // => undefined

      eq(nth(2, 'abc'), 'c') // => 'c'
      eq(nth(3, 'abc'), '') // => ''
    })
  )
)
