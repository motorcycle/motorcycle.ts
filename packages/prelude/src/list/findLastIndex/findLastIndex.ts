import { curry2 } from '../../function/curry'
import { FindLastIndexArity2 } from './types'

/**
 * Returns the index of the last element of the list which matches the predicate,
 * or -1 if no element matches.
 */
export const findLastIndex: FindLastIndexArity2 = curry2(function findLastIndex<A>(
  f: (a: A) => boolean,
  list: Array<A>
): number {
  const length = list.length

  for (let i = length - 1; i >= 0; --i) if (f(list[i])) return i

  return -1
})
