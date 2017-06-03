import { curry4 } from '../../function/curry'
import { ReduceByArity4 } from './types'

export const reduceBy: ReduceByArity4 = curry4(function<A, B>(
  f: (acc: B, x: A) => B,
  seed: B,
  by: (a: A) => string,
  list: Array<A>
): { readonly [key: string]: B } {
  const length = list.length
  const newObj: any = {}

  for (let i = 0; i < length; ++i) {
    const a = list[i]
    const key = by(a)
    const b = f(newObj[key] || seed, a)

    newObj[key] = b
  }

  return newObj
})
