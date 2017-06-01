import { curry2 } from '../../function/curry'
import { equals } from '../../relation/equals'
import { findLastIndex } from '../findLastIndex'
import { LastIndexOfArity2 } from './types'

/**
 * Returns the position of the last occurrence of an item in an array, or -1
 * if the item is not included in the array.
 */
export const lastIndexOf: LastIndexOfArity2 =
  curry2(<A>(value: A, list: Array<A>) => findLastIndex(equals(value), list))
