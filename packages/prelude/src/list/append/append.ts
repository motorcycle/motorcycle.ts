import { curry2 } from '../../function/curry'
import { AppendArity2 } from './types'

/**
 * Returns a new list containing the contents of the given list,
 * followed by the given element.
 */
export const append: AppendArity2 = curry2(
  function append<A>(a: A, list: Array<A>): Array<A> {
    const length = list.length
    const newList = Array(length + 1)

    for (let i = 0; i < length; ++i)
    {
      newList[i] = list[i]
    }

    newList[length] = a

    return newList
  }
)
