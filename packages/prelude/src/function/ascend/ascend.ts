import { curry3 } from '../curry'
import { ComparisonNumbers } from '../types'
import { AscendArity3 } from './types'

export const ascend: AscendArity3 = curry3(function ascend<A, B>(
  f: (a: A) => B,
  a: A,
  b: A
): ComparisonNumbers {
  const aa = f(a)
  const bb = f(b)

  if (aa < bb) return -1

  if (aa > bb) return 1

  return 0
})
