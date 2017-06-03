import { curry3 } from '../../function/curry'
import { MapAccumRightArity3 } from './types'

export const mapAccumRight: MapAccumRightArity3 = curry3(function mapAccum<A, B, C>(
  f: (value: A, acc: B) => [C, B],
  seed: B,
  list: Array<A>
): [Array<C>, B] {
  const length = list.length
  const newList = Array(length)
  let r = seed

  for (let i = length - 1; i >= 0; --i) {
    const [c, b] = f(list[i], r)
    r = b
    newList[i] = c
  }

  return [newList, r]
})
