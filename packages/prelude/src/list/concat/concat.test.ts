import { eq } from '@briancavalier/assert'
import { Test, describe, it } from '@typed/test'

import { concat } from './concat'

export const test: Test = describe('concat',
  it('concatenates two lists', () => {
    eq(concat([ 1, 2 ], [ 3, 4 ]), [ 1, 2, 3, 4 ])
  }),

  it('concatenates two strings', () => {
    eq<any>(concat('foo', 'bar'), 'foobar')
  })
)
