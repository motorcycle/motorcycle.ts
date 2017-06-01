export type RightReducer<A, B> = (value: A, accumulator: B, index?: number) => B

export interface ReduceRightArity3 {
  <A, B>(f: RightReducer<A, B>, seed: B, list: Array<A>): B
  <A, B>(f: RightReducer<A, B>, seed: B, list: ArrayLike<A>): B
  <A, B>(f: RightReducer<A, B>, seed: B, list: ReadonlyArray<A>): B

  <A, B>(f: RightReducer<A, B>, seed: B): ReduceRightArity1<A, B>
  <A, B>(f: RightReducer<A, B>): ReduceRightArity2<A, B>
}

export interface ReduceRightArity2<A, B> {
  (seed: B, list: Array<A>): B
  (seed: B, list: ArrayLike<A>): B
  (seed: B, list: ReadonlyArray<A>): B

  (seed: B): ReduceRightArity1<A, B>
}

export interface ReduceRightArity1<A, B> {
  (list: Array<A>): B
  (list: ArrayLike<A>): B
  (list: ReadonlyArray<A>): B
}
