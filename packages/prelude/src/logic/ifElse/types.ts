import { Arity1, Predicate } from '../../function/types'

export interface IfElseArity4 {
  <A, B>(predicate: Predicate<A>, thenF: Arity1<A, B>, elseF: Arity1<A, B>, value: A): B
  <A, B>(predicate: Predicate<A>, thenF: Arity1<A, B>, elseF: Arity1<A, B>): IfElseArity1<A, B>
  <A, B>(predicate: Predicate<A>, thenF: Arity1<A, B>): IfElseArity2<A, B>
  <A>(predicate: Predicate<A>): IfElseArity3<A>
}

export interface IfElseArity3<A> {
  <B>(thenF: Arity1<A, B>, elseF: Arity1<A, B>, value: A): B
  <B>(thenF: Arity1<A, B>, elseF: Arity1<A, B>): IfElseArity1<A, B>
  <B>(thenF: Arity1<A, B>): IfElseArity2<A, B>
}

export interface IfElseArity2<A, B> {
  (elseF: Arity1<A, B>, value: A): B
  (elseF: Arity1<A, B>): IfElseArity1<A, B>
}

export type IfElseArity1<A, B> = (value: A) => B
