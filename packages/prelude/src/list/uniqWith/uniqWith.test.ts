import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { uniqWith } from './uniqWith'

export const test: Test = describe('uniqWith',
  given('(a -> a -> boolean) -> [a]',
    it('-> [a]', () => {
      const xs = [ 1, '1', 2, '2', 3, 4 ]
      const comparator = (x: number | string, y: number | string) => String(x) === String(y)

      eq(uniqWith(comparator, xs), [ 1, 2, 3, 4 ])
    })
  )
)
