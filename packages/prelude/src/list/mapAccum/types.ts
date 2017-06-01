export interface MapAccumArity3 {
  <A, B, C>(f: (acc: B, value: A) => [B, C], seed: B, list: Array<A>): [B, ReadonlyArray<C>]
  <A, B, C>(f: (acc: B, value: A) => [B, C], seed: B, list: ArrayLike<A>): [B, ReadonlyArray<C>]
  <A, B, C>(f: (acc: B, value: A) => [B, C], seed: B, list: ReadonlyArray<A>): [B, ReadonlyArray<C>]

  <A, B, C>(f: (acc: B, value: A) => [B, C], seed: B): MapAccumArity1<A, B, C>
  <A, B, C>(f: (acc: B, value: A) => [B, C]): MapAccumArity2<A, B, C>
}

export interface MapAccumArity2<A, B, C> {
  (seed: B, list: Array<A>): [B, ReadonlyArray<C>]
  (seed: B, list: ArrayLike<A>): [B, ReadonlyArray<C>]
  (seed: B, list: ReadonlyArray<A>): [B, ReadonlyArray<C>]

  (seed: B): MapAccumArity1<A, B, C>
}

export interface MapAccumArity1<A, B, C> {
  (list: Array<A>): [B, ReadonlyArray<C>]
  (list: ArrayLike<A>): [B, ReadonlyArray<C>]
  (list: ReadonlyArray<A>): [B, ReadonlyArray<C>]
}
