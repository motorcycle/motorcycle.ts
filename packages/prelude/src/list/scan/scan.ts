import { curry3 } from '../../function/curry'
import { Reducer } from '../reduce'
import { ScanArity3 } from './types'

export const scan: ScanArity3 = curry3(function scan<A, B>(
  f: Reducer<A, B>,
  seed: B,
  list: Array<A>
): ReadonlyArray<B> {
  const length = list.length
  const newList = Array(length)
  let acc: B = seed

  for (let i = 0; i < length; ++i) {
    acc = f(acc, list[i], i)
    newList[i] = acc
  }

  return newList
})
