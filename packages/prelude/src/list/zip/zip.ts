import { curry2 } from '../../function/curry'
import { ZipArity2 } from './types'

export const zip: ZipArity2 = curry2(
  function zip<A, B>(xs: Array<A>, ys: Array<B>): ReadonlyArray<[ A, B ]> {
    const length = Math.min(xs.length, ys.length)
    const newList = Array(length)

    for (let i = 0; i < length; ++i)
      newList[i] = [ xs[i], ys[i] ]

    return newList
  }
)
