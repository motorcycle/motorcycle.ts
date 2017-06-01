import { ReduceWhileArity4, ReduceWhilePredicate } from './types'

import { curry4 } from '../../function/curry'
import { Reducer } from '../reduce'

export const reduceWhile: ReduceWhileArity4 = curry4(
  function reduceWhile<A, B>(p: ReduceWhilePredicate<A, B>, f: Reducer<A, B>, seed: B, list: Array<A>): B {
    const length = list.length
    let b = seed

    for (let i = 0; i < length; ++i)
    {
      const a = list[i]

      if (!p(b, a))
        break

      b = f(b, a, i)
    }

    return b
  }
)
