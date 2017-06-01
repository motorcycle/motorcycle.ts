import { curry2 } from '../../function/curry'
import { slice } from '../slice'
import { SplitEveryArity2 } from './types'

export const splitEvery: SplitEveryArity2 = curry2(
  function splitEvery<A>(amount: number, list: Array<A>): ReadonlyArray<ReadonlyArray<A>> {
    if (amount <= 0)
      return [ list ]

    const result = []
    let i = 0

    while (i < list.length)
      result.push(slice(i, i += amount, list))

    return result
  }
)
