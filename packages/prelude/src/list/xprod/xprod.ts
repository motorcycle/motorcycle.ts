import { curry2 } from '../../function/curry'
import { XProdArity2 } from './types'

export const xprod: XProdArity2 = curry2(
  function xprod<A, B>(xs: Array<A>, ys: Array<B>): ReadonlyArray<[ A, B ]> {
    const xLength = xs.length
    const yLength = ys.length

    const newList: Array<[A, B]> = []

    for (let i = 0; i < xLength; ++i)
    {
      const x = xs[i]

      for (let j = 0; j < yLength; ++j)
        newList.push([ x, ys[j] ])
    }

    return newList
  }
)
