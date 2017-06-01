import { curry2 } from '../../function/curry'
import { AnyArity2 } from './types'

/**
 * Returns true if at least one of elements of the list match the predicate,
 * false otherwise.
 */
export const any: AnyArity2 = curry2(
  function any<A>(f: (a: A) => boolean, list: Array<A>): boolean {
    const length = list.length

    for (let i = 0; i < length; ++i)
      if (f(list[i]))
        return true

    return false
  }
)
