import { Predicate } from '../../function'

export interface AllPassArity2 {
  <A>(predicates: Array<Predicate<A>>, value: A): boolean
  <A>(predicates: ArrayLike<Predicate<A>>, value: A): boolean
  <A>(predicates: ReadonlyArray<Predicate<A>>, value: A): boolean

  <A>(predicates: Array<Predicate<A>>): AllPassArity1<A>
  <A>(predicates: ArrayLike<Predicate<A>>): AllPassArity1<A>
  <A>(predicates: ReadonlyArray<Predicate<A>>): AllPassArity1<A>
}

export type AllPassArity1<A> = (value: A) => boolean
