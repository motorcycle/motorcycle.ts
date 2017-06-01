import { curry2 } from '../../function/curry'
import { dropLast } from '../dropLast'
import { DropLastWhileArity2 } from './types'

/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a falsy value. The predicate function is applied to one
 * argument: (value).
 */
export const dropLastWhile: DropLastWhileArity2 = curry2(
  function dropLastWhile<A>(f: (a: A) => boolean, list: Array<A>): ReadonlyArray<A> {
    const length = list.length

    let i = length

    while (i > 0) {
      if (!f(list[i - 1]))
        return dropLast(length - i, list)

      i--
    }

    return dropLast(0, list)
  }
)
