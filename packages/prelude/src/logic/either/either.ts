import { Predicate } from '../../function'
import { curry3 } from '../../function/curry/curry3'

export const either: Either = curry3(function either<A>(
  p1: Predicate<A>,
  p2: Predicate<A>,
  a: A
): boolean {
  if (p1(a) || p2(a)) return true

  return false
})

export interface Either {
  <A>(p1: Predicate<A>, p2: Predicate<A>, a: A): boolean
  <A>(p1: Predicate<A>, p2: Predicate<A>): (a: A) => boolean
  <A>(p1: Predicate<A>): (p2: Predicate<A>, a: A) => boolean
  <A>(p1: Predicate<A>): (p2: Predicate<A>) => (a: A) => boolean
}
