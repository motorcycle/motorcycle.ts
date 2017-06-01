import { curry4 } from '../../function/curry'
import { Arity1, Predicate } from '../types'
import { OnlyWhenArity4 } from './types'

export const onlyWhen: OnlyWhenArity4 = curry4(
  function <A, B> (p: Predicate<A>, b: B, f: Arity1<A, B>, a: A): B {
    return p(a) ? f(a) : b
  }
)
