import { curry2 } from '../../function/curry'
import { ForEachArity2 } from './types'

/**
 * Iterate over an input list, calling a provided function fn for each
 * element in the list.
 */
export const forEach: ForEachArity2 = curry2(
  function forEach<A>(f: (a: A, index: number) => any, list: Array<A>): Array<A> {
    const length = list.length

    for (let i = 0; i < length; ++i)
      f(list[i], i)

    return list
  }
)
