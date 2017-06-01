import { curry2 } from '../../function/curry/curry2'
import { AnyPassArity2 } from './types'

export const anyPass: AnyPassArity2 = curry2(
  function anyPass<A>(predicates: Array<(a: A) => boolean>, value: A) {
    for (const predicate of predicates)
      if (predicate(value))
        return true

    return false
  }
)
