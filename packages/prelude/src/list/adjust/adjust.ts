import { curry3 } from '../../function/curry'
import { AdjustArity3 } from './types'

/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 */
export const adjust: AdjustArity3 = curry3(function adjust<A>(
  f: (a: A) => A,
  index: number,
  list: Array<A>
): Array<A> {
  const length = list.length
  const newList = Array(length)

  for (let i = 0; i < length; ++i) newList[i] = i === index ? f(list[i]) : list[i]

  return newList
})
