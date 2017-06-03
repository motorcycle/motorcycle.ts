import { curry2 } from '../../function/curry'
import { ApertureArity2 } from './types'

/**
 * Returns a new list, composed of n-tuples of consecutive elements If n is
 * greater than the length of the list, an empty list is returned.
 */
export const aperture: ApertureArity2 = curry2(function aperture<A>(
  n: number,
  list: Array<A>
): Array<Array<A>> | Array<never> {
  const length = list.length
  const newList: Array<Array<A>> = []

  for (let i = 0; i < length; ++i) {
    const innerList = list.slice(i, i + n)

    if (innerList.length < n) break

    newList[i] = list.slice(i, i + n)
  }

  return newList
})
