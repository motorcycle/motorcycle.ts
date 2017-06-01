import { Comparator, Predicate2 } from '../types'

export function comparator<A>(predicate: Predicate2<A>): Comparator<A> {
  return function (a: A, b: A) {
    if (predicate(a, b))
      return -1

    if (predicate(b, a))
      return 1

    return 0
  }
}
