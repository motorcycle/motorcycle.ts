import { curry3 } from '../../function/curry'
import { InsertArity3 } from './types'

/**
 * Inserts the supplied element into the list, at index index. Note that this
 * is not destructive: it returns a copy of the list with the changes. No lists
 * have been harmed in the application of this function.
 */
export const insert: InsertArity3 = curry3(function insert<A>(
  index: number,
  value: A,
  list: Array<A>
): Array<A> {
  const length = list.length

  if (index < 0) return list

  if (length === 0) return [value]

  const newList = []
  let i = 0

  for (; i < index; ++i) newList[i] = list[i]

  newList[i++] = value

  for (; i <= length; ++i) newList[i] = list[i - 1]

  return newList
})
