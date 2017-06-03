import { curry2 } from '../../function/curry'
import { FindLastArity2 } from './types'

/**
 * Returns the last element of the list which matches the predicate,
 * or undefined if no element matches.
 */
export const findLast: FindLastArity2 = curry2(function findLast<A>(
  f: (a: A) => boolean,
  list: Array<A>
): A | void {
  const length = list.length

  for (let i = length - 1; i >= 0; --i) if (f(list[i])) return list[i]

  return void 0
})
