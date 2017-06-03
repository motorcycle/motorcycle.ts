import { curry2 } from '../../function/curry/curry2'
import { Predicate } from '../../function/types'
import { AllPassArity2 } from './types'

export const allPass: AllPassArity2 = curry2(<
  A
>(predicates: Array<Predicate<A>>, value: A): boolean => {
  for (const predicate of predicates) if (!predicate(value)) return false

  return true
})
