import { curry2 } from '../../function/curry'
import { PrependArity2 } from './types'

export const prepend: PrependArity2 = curry2(function<A>(value: A, list: Array<A>) {
  const length = list.length
  const newList = Array(length + 1)

  newList[0] = value

  for (let i = 0; i < length; ++i) newList[i + 1] = list[i]

  return newList
})
