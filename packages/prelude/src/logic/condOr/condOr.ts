import { CondOrArity3, Conditional } from './types'

import { curry3 } from '../../function/curry/curry3'

export const condOr: CondOrArity3 = curry3(
  function condOr<A, B>(predicates: Array<Conditional<A, B>>, defaultValue: B, a: A): B {
    for (const [ predicate, f ] of predicates)
      if (predicate(a))
        return f(a)

    return defaultValue
  }
)
