import { Arity1, Predicate } from '../../function'

export type Conditional<A, B> = [Predicate<A>, Arity1<A, B>]

export interface CondOrArity3 {
  <A, B>(predicates: Array<Conditional<A, B>>, defaultValue: B, value: A): B
  <A, B>(predicates: ArrayLike<Conditional<A, B>>, defaultValue: B, value: A): B
  <A, B>(predicates: ReadonlyArray<Conditional<A, B>>, defaultValue: B, value: A): B

  <A, B>(predicates: Array<Conditional<A, B>>, defaultValue: B): CondOrArity1<A, B>
  <A, B>(predicates: ArrayLike<Conditional<A, B>>, defaultValue: B): CondOrArity1<A, B>
  <A, B>(predicates: ReadonlyArray<Conditional<A, B>>, defaultValue: B): CondOrArity1<A, B>

  <A, B>(predicates: Array<Conditional<A, B>>): CondOrArity2<A, B>
  <A, B>(predicates: ArrayLike<Conditional<A, B>>): CondOrArity2<A, B>
  <A, B>(predicates: ReadonlyArray<Conditional<A, B>>): CondOrArity2<A, B>
}

export interface CondOrArity2<A, B> {
  (defaultValue: B, value: A): B
  (defaultValue: B): CondOrArity1<A, B>
}

export type CondOrArity1<A, B> = (value: A) => B
