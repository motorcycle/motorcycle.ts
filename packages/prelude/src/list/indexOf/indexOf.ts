import { curry2 } from '../../function/curry'
import { equals } from '../../relation/equals'
import { findIndex } from '../findIndex'
import { IndexOfArity2 } from './types'

/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array.
 */
export const indexOf: IndexOfArity2 = curry2(<A>(value: A, list: Array<A>) =>
  findIndex(equals(value), list)
)
