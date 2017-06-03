import { curry3 } from '../curry/curry3'
import { Arity1 } from '../types'
import { TryCatchArity3 } from './types'

export const tryCatch: TryCatchArity3 = curry3(function tryCatch<A, B>(
  tryer: Arity1<A, B>,
  catcher: Arity1<Error, B>,
  a: A
): B {
  try {
    return tryer(a)
  } catch (e) {
    return catcher(e)
  }
})
