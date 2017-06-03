import { assert, eq } from '@briancavalier/assert'
import { Test, describe, it } from '@typed/test'

import { isMaybe, just, nothing } from '../../maybe'

import { chain } from './chain'

export const test: Test = describe(
  'chain',
  it('chains an array', () => {
    const array = [1, 2, 3]
    const duplicate = (x: number) => [x, x]

    eq(chain(duplicate, array), [1, 1, 2, 2, 3, 3])
  }),
  it('chains a Maybe', () => {
    const add1 = chain((x: number) => just(x + 1))

    const maybes = [just(1), nothing()].map(add1)

    maybes.forEach(maybe => assert(isMaybe(maybe)))
  })
)
