import { Reducer } from '../reduce'

export interface ScanArity3 {
  <A, B>(f: Reducer<A, B>, seed: B, list: Array<A>): B
  <A, B>(f: Reducer<A, B>, seed: B, list: ArrayLike<A>): B
  <A, B>(f: Reducer<A, B>, seed: B, list: ReadonlyArray<A>): B

  <A, B>(f: Reducer<A, B>, seed: B): ScanArity1<A, B>
  <A, B>(f: Reducer<A, B>): ScanArity2<A, B>
}

export interface ScanArity2<A, B> {
  (seed: B, list: Array<A>): B
  (seed: B, list: ArrayLike<A>): B
  (seed: B, list: ReadonlyArray<A>): B

  (seed: B): ScanArity1<A, B>
}

export interface ScanArity1<A, B> {
  (list: Array<A>): B
  (list: ArrayLike<A>): B
  (list: ReadonlyArray<A>): B
}
