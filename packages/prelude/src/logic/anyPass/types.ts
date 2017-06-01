import { Predicate } from '../../function/types'

export interface AnyPassArity2 {
  <A>(predicates: Array<Predicate<A>>, value: A): boolean
  <A>(predicates: ArrayLike<Predicate<A>>, value: A): boolean
  <A>(predicates: ReadonlyArray<Predicate<A>>, value: A): boolean

  <A>(predicates: Array<Predicate<A>>): AnyPassArity1<A>
  <A>(predicates: ArrayLike<Predicate<A>>): AnyPassArity1<A>
  <A>(predicates: ReadonlyArray<Predicate<A>>): AnyPassArity1<A>
}

export type AnyPassArity1<A> = (value: A) => boolean
