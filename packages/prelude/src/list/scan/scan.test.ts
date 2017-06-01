import { eq } from '@briancavalier/assert'
import { Test, describe, it } from '@typed/test'

import { scan } from './scan'

export const test: Test = describe('scan',
  it('(b -> a -> b) -> b -> [a] -> [b]', () => {
    const append = <A>(acc: Array<A>, value: A) => acc.concat(value)
    const xs = [ 1, 2, 3 ]

    eq(scan(append, [], xs), [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ] ])
  })
)
