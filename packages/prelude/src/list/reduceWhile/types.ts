import { Reducer } from '../reduce'

export type ReduceWhilePredicate<A, B> = (acc: B, value: A) => boolean

export interface ReduceWhileArity4 {
  <A, B>(p: ReduceWhilePredicate<A, B>, f: Reducer<A, B>, seed: B, list: Array<A>): B
  <A, B>(p: ReduceWhilePredicate<A, B>, f: Reducer<A, B>, seed: B, list: ArrayLike<A>): B
  <A, B>(p: ReduceWhilePredicate<A, B>, f: Reducer<A, B>, seed: B, list: ReadonlyArray<A>): B

  <A, B>(p: ReduceWhilePredicate<A, B>, f: Reducer<A, B>, seed: B): ReduceWhileArity1<A, B>
  <A, B>(p: ReduceWhilePredicate<A, B>, f: Reducer<A, B>): ReduceWhileArity2<A, B>
  <A, B>(p: ReduceWhilePredicate<A, B>): ReduceWhileArity3<A, B>
}

export interface ReduceWhileArity3<A, B> {
  (f: Reducer<A, B>, seed: B, list: Array<A>): B
  (f: Reducer<A, B>, seed: B, list: ArrayLike<A>): B
  (f: Reducer<A, B>, seed: B, list: ReadonlyArray<A>): B

  (f: Reducer<A, B>, seed: B): ReduceWhileArity1<A, B>
  (f: Reducer<A, B>): ReduceWhileArity2<A, B>
}

export interface ReduceWhileArity2<A, B> {
  (seed: B, list: Array<A>): B
  (seed: B, list: ArrayLike<A>): B
  (seed: B, list: ReadonlyArray<A>): B

  (seed: B): ReduceWhileArity1<A, B>
}

export interface ReduceWhileArity1<A, B> {
  (list: Array<A>): B
  (list: ArrayLike<A>): B
  (list: ReadonlyArray<A>): B
}
