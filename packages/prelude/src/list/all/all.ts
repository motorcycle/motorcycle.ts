import { curry2 } from '../../function/curry'
import { AllArity2 } from './types'

/**
 * Returns true if all elements of the list match the predicate,
 * false if there are any that don't.
 */
export const all: AllArity2 = curry2(
  function all<A>(f: (a: A) => boolean, list: Array<A>): boolean {
    const length = list.length

    for (let i = 0; i < length; ++i)
      if (!f(list[i]))
        return false

    return true
  }
)
