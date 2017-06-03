import { curry2 } from '../../function/curry'
import { drop } from '../drop'
import { DropWhileArity2 } from './types'

/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * true. The predicate function is applied to one argument: (value).
 */
export const dropWhile: DropWhileArity2 = curry2(function dropWhile<A>(
  f: (a: A) => boolean,
  list: Array<A>
): ReadonlyArray<A> {
  const length = list.length

  let i = 0

  while (i < length) {
    if (!f(list[i])) return drop(i, list)

    i++
  }

  return drop(0, list)
})
