import { curry2 } from '../../function/curry'
import { IntersperseArity2 } from './types'

export const intersperse: IntersperseArity2 = curry2(function intersperse<A>(
  value: A,
  list: Array<A>
): Array<A> {
  const length = list.length
  const newLength = length * 2 - 1
  const newList = Array(newLength)

  for (let i = 0; i < length - 1; ++i) {
    newList[i * 2] = list[i]
    newList[i * 2 + 1] = value
  }

  newList[newLength - 1] = list[length - 1]

  return newList
})
