import { Maybe } from '../../maybe'

export interface MapArity2 {
  <A, B>(f: (a: A, index: number) => B, list: Array<A>): ReadonlyArray<B>
  <A, B>(f: (a: A, index: number) => B, list: ArrayLike<A>): ReadonlyArray<B>
  <A, B>(f: (a: A, index: number) => B, list: ReadonlyArray<A>): ReadonlyArray<B>
  <A, B>(f: (a: A) => B, list: Array<A>): ReadonlyArray<B>
  <A, B>(f: (a: A) => B, list: ArrayLike<A>): ReadonlyArray<B>
  <A, B>(f: (a: A) => B, list: ReadonlyArray<A>): ReadonlyArray<B>

  <A, B>(f: (a: A) => B, maybe: Maybe<A>): Maybe<B>

  <A, B>(f: (a: A, index: number) => B): MapArity1<A, B>
  <A, B>(f: (a: A) => B): MapArity1<A, B>
}

export interface MapArity1<A, B> {
  (list: Array<A>): ReadonlyArray<B>
  (list: ArrayLike<A>): ReadonlyArray<B>
  (list: ReadonlyArray<A>): ReadonlyArray<B>

  (maybe: Maybe<A>): Maybe<B>
}
