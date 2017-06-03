import { curry2 } from '../../function/curry'
import { ConcatArity2 } from './types'

/**
 * Returns the result of concatenating the given lists or strings.
 */
export const concat: ConcatArity2 = curry2(function(list1: any, list2: any): any {
  if (typeof list1 === 'string') return list1 + (list2 as string)

  const length1 = list1.length
  const length2 = list2.length
  const newList = Array(length1 + length2)

  for (let i = 0; i < length1; ++i) newList[i] = list1[i]

  for (let i = 0; i < length2; ++i) newList[i + length1] = list2[i]

  return newList
})
