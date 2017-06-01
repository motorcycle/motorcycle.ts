import { eq } from '@briancavalier/assert'
import { Test, describe, it } from '@typed/test'

import { dropRepeatsWith } from './dropRepeatsWith'

export const test: Test = describe('dropRepeatsWith',
  it('drops repeated values', () => {
    const f = (x: number, y: number) => x === y

    const array = [ 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5 ]

    eq(dropRepeatsWith(f, array), [ 1, 2, 3, 4, 5 ])
  })
)
