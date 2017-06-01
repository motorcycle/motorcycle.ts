import { Just, Nothing, fromJust, isJust } from '../../maybe'

import { curry2 } from '../../function/curry'
import { isArrayLike } from '../isArrayLike'
import { ChainArity2 } from './types'

/**
 * chain maps a function over a list and concatenates the results.
 * chain is also known as flatMap in some libraries
 *
 * Dispatches to the chain method of the second argument, if present,
 * according to the FantasyLand Chain spec.
 */
export const chain: ChainArity2 = curry2(
  function chain<A, B>(f: (a: A) => Array<B>, list: any): any {
    if (!isArrayLike(list))
      return isJust(list) ? f(fromJust(list as Just<A>)) : list as Nothing

    const length = list.length
    const newList: Array<B> = []

    for (let i = 0; i < length; ++i)
    {
      const b = f(list[i])
      newList.push.apply(newList, isArrayLike(b) ? b : [ b ])
    }

    return newList
  }
)
