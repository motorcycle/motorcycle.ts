export interface MapAccumRightArity3 {
  <A, B, C>(f: (value: A, acc: B) => [C, B], seed: B, list: Array<A>): [B, ReadonlyArray<C>]
  <A, B, C>(f: (value: A, acc: B) => [C, B], seed: B, list: ArrayLike<A>): [B, ReadonlyArray<C>]
  <A, B, C>(f: (value: A, acc: B) => [C, B], seed: B, list: ReadonlyArray<A>): [B, ReadonlyArray<C>]

  <A, B, C>(f: (value: A, acc: B) => [C, B], seed: B): MapAccumRightArity1<A, B, C>
  <A, B, C>(f: (value: A, acc: B) => [C, B]): MapAccumRightArity2<A, B, C>
}

export interface MapAccumRightArity2<A, B, C> {
  (seed: B, list: Array<A>): [B, ReadonlyArray<C>]
  (seed: B, list: ArrayLike<A>): [B, ReadonlyArray<C>]
  (seed: B, list: ReadonlyArray<A>): [B, ReadonlyArray<C>]

  (seed: B): MapAccumRightArity1<A, B, C>
}

export interface MapAccumRightArity1<A, B, C> {
  (list: Array<A>): [B, ReadonlyArray<C>]
  (list: ArrayLike<A>): [B, ReadonlyArray<C>]
  (list: ReadonlyArray<A>): [B, ReadonlyArray<C>]
}
