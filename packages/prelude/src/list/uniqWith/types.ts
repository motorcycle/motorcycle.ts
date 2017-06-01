export interface UniqWithArity2 {
  <A>(comparator: (a: A, b: A) => boolean, list: Array<A>): ReadonlyArray<A>
  <A>(comparator: (a: A, b: A) => boolean, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(comparator: (a: A, b: A) => boolean, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(comparator: (a: A, b: A) => boolean): UniqWithArity1<A>
}

export interface UniqWithArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
