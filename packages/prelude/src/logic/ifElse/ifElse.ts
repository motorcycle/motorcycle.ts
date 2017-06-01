import { Arity1, Predicate, curry4 } from '../../function'

import { IfElseArity4 } from './types'

export const ifElse: IfElseArity4 = curry4(
  function ifElse<A, B>(predicate: Predicate<A>, thenF: Arity1<A, B>, elseF: Arity1<A, B>, value: A): B {
    if (predicate(value)) return thenF(value)

    return elseF(value)
  }
)
