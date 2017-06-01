import { ReduceRightArity3, RightReducer } from './types'

import { curry3 } from '../../function/curry'

export const reduceRight: ReduceRightArity3 = curry3(
  function reduce<A, B>(f: RightReducer<A, B>, seed: B, list: Array<A>): B {
    const length = list.length
    let acc: B = seed

    for (let i = length - 1; i >= 0; --i)
      acc = f(list[i], acc, i)

    return acc
  }
)
