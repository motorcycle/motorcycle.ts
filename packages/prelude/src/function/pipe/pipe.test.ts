import { eq } from '@briancavalier/assert'
import { Test, describe, it } from '@typed/test'

import { pipe } from './pipe'

export const test: Test = describe(
  'pipe',
  it('pipes functions', () => {
    const f = (x: number) => x + 1
    const g = (x: number) => x * 2

    eq(pipe(f)(1), 2)
    eq(pipe(f, g)(1), 4)
    eq(pipe(f, g, g)(1), 8)
    eq(pipe(f, g, g, f)(1), 9)
    eq(pipe(f, g, g, f, g, g, f)(1), 37)
  })
)
