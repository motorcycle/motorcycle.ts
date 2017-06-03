import { curry3 } from '../../function/curry'
import { ZipWithArity3 } from './types'

export const zipWith: ZipWithArity3 = curry3(function zipWith<A, B, C>(
  f: (a: A, b: B) => C,
  xs: Array<A>,
  ys: Array<B>
): ReadonlyArray<C> {
  const length = Math.min(xs.length, ys.length)
  const newList = Array(length)

  for (let i = 0; i < length; ++i) newList[i] = f(xs[i], ys[i])

  return newList
})
