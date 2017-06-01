import { Just, Maybe } from '../../maybe'

export type Reducer<A, B> =
  ((seed: B, value: A, index: number) => B)

export interface ReduceArity3 {
  <A, B>(f: Reducer<A, B>, seed: B, list: Array<A>): B
  <A, B>(f: Reducer<A, B>, seed: B, list: ArrayLike<A>): B
  <A, B>(f: Reducer<A, B>, seed: B, list: ReadonlyArray<A>): B
  <A, B>(f: Reducer<A, B>, seed: B, maybe: Maybe<A>): Just<B>

  <A, B>(f: Reducer<A, B>, seed: B): ReduceArity1<A, B>
  <A, B>(f: Reducer<A, B>): ReduceArity2<A, B>
}

export interface ReduceArity2<A, B> {
  (seed: B, list: Array<A>): B
  (seed: B, list: ArrayLike<A>): B
  (seed: B, list: ReadonlyArray<A>): B
  (seed: B, list: Maybe<A>): Just<B>

  (seed: B): ReduceArity1<A, B>
}

export interface ReduceArity1<A, B> {
  (list: Array<A>): B
  (list: ArrayLike<A>): B
  (list: ReadonlyArray<A>): B
  (list: Maybe<A>): Just<B>
}
