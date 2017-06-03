import { curry2 } from '../../function/curry'
import { FindArity2 } from './types'

/**
 * Returns the first element of the list which matches the predicate,
 * or undefined if no element matches.
 */
export const find: FindArity2 = curry2(function find<A>(
  f: (a: A) => boolean,
  list: Array<A>
): A | void {
  const length = list.length

  for (let i = 0; i < length; ++i) if (f(list[i])) return list[i]

  return void 0
})
