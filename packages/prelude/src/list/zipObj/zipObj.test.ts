import { eq } from '@briancavalier/assert'
import { Test, describe, it } from '@typed/test'

import { zipObj } from './zipObj'

export const test: Test = describe('zipObj',
  describe('[string] -> [a]',
    it('-> { string: A }', () => {
      const keys = [ 'a', 'b', 'c' ]
      const values = [ 1, 2, 3 ]

      eq(zipObj(keys, values), { a: 1, b: 2, c: 3 })
      eq(zipObj(keys.concat('d'), values), { a: 1, b: 2, c: 3 })
      eq(zipObj(keys, values.concat(4)), { a: 1, b: 2, c: 3 })
    })
  )
)
