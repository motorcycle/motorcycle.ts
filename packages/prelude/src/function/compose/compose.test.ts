// tslint:disable:no-magic-numbers
import { eq } from '@briancavalier/assert'
import { Test, describe, it } from '@typed/test'

import { compose } from './compose'

export const test: Test = describe(
  'compose',
  it('composes functions', () => {
    const f = (x: number) => x + 1
    const g = (x: number) => x * 2

    eq(compose(f)(1), 2)
    eq(compose(g, f)(1), 4)
    eq(compose(g, g, f)(1), 8)
    eq(compose(f, g, g, f)(1), 9)
    eq(compose(f, g, g, f, g, g, f)(1), 37)
  })
)
