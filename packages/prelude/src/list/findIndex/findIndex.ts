import { curry2 } from '../../function/curry'
import { FindIndexArity2 } from './types'

/**
 * Returns the index of the first element of the list which matches the
 * predicate, or -1 if no element matches.
 */
export const findIndex: FindIndexArity2 = curry2(function findIndex<A>(
  f: (a: A) => boolean,
  list: Array<A>
): number {
  const length = list.length

  for (let i = 0; i < length; ++i) if (f(list[i])) return i

  return -1
})
