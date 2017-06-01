import { ReverseArity1 } from './types'

export const reverse: ReverseArity1 = function reverse<A>(list: Array<A>): ReadonlyArray<A> {
  const length = list.length
  const newList = Array(length)

  for (let i = 0; i < length; ++i)
    newList[i] = list[length - i - 1]

  return newList
}
