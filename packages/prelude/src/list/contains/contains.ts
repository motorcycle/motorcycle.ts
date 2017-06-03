import { curry2 } from '../../function/curry'
import { equals } from '../../relation/equals'
import { ContainsArity2 } from './types'

/**
 * Returns true if the specified value is equal, in value equality terms,
 * to at least one element of the given list; false otherwise.
 */
export const contains: ContainsArity2 = curry2(function contains<A>(
  value: A,
  list: Array<A>
): boolean {
  const length = list.length

  for (let i = 0; i < length; ++i) if (equals(value, list[i])) return true

  return false
})
