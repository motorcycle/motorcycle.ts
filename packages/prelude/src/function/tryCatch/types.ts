import { Arity1 } from '../types'

export interface TryCatchArity3 {
  <A, B>(tryer: Arity1<A, B>, catcher: Arity1<Error, B>, a: A): B
  <A, B>(tryer: Arity1<A, B>): TryCatchArity2<A, B>
  <A, B>(tryer: Arity1<A, B>, catcher: Arity1<Error, B>): TryCatchArity1<A, B>
}

export interface TryCatchArity2<A, B> {
  (catcher: Arity1<Error, B>, a: A): B
  (catcher: Arity1<Error, B>): TryCatchArity1<A, B>
}

export type TryCatchArity1<A, B> = (a: A) => B
