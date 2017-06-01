import { BinaryArity1 } from './types'

export const binary: BinaryArity1 = function binary(f: (...args: Array<any>) => any) {
  return function binaryFn<A, B>(a: A, b: B) {
    return f(a, b)
  }
}
