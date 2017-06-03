import { curry3 } from '../../function/curry'
import { MapAccumArity3 } from './types'

export const mapAccum: MapAccumArity3 = curry3(function mapAccum<A, B, C>(
  f: (acc: B, value: A) => [B, C],
  seed: B,
  list: Array<A>
): [B, Array<C>] {
  const length = list.length
  const newList = Array(length)
  let r = seed

  for (let i = 0; i < length; ++i) {
    const [b, c] = f(r, list[i])
    r = b
    newList[i] = c
  }

  return [r, newList]
})
