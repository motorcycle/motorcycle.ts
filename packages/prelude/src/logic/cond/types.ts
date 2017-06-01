import { Maybe } from '../../maybe'
import { Conditional } from '../condOr'

export interface CondArity2 {
  <A, B>(predicates: Array<Conditional<A, B>>, value: A): Maybe<B>
  <A, B>(predicates: ArrayLike<Conditional<A, B>>, value: A): Maybe<B>
  <A, B>(predicates: ReadonlyArray<Conditional<A, B>>, value: A): Maybe<B>

  <A, B>(predicates: Array<Conditional<A, B>>): CondArity1<A, B>
  <A, B>(predicates: ArrayLike<Conditional<A, B>>): CondArity1<A, B>
  <A, B>(predicates: ReadonlyArray<Conditional<A, B>>): CondArity1<A, B>
}

export type CondArity1<A, B> = (value: A) => Maybe<B>
