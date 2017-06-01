import { Arity1, Predicate } from '../types'

export interface OnlyWhenArity4 {
  <A, B> (p: Predicate<A>, b: B, f: Arity1<A, B>, a: A): B
  <A, B> (p: Predicate<A>, b: B, f: Arity1<A, B>): Arity1<A, B>
  <A, B> (p: Predicate<A>, b: B): OnlyWhenArity2<A, B>
  <A> (p: Predicate<A>): OnlyWhenArity3<A>
}

export interface OnlyWhenArity3<A> {
  <B> (b: B, f: Arity1<A, B>, a: A): B
  <B> (b: B, f: Arity1<A, B>): Arity1<A, B>
  <B> (b: B): OnlyWhenArity2<A, B>
}

export interface OnlyWhenArity2<A, B> {
  (f: Arity1<A, B>, a: A): B
  (f: Arity1<A, B>): Arity1<A, B>
}
