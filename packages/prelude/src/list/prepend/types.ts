export interface PrependArity2 {
  <A>(value: A, list: Array<A>): ReadonlyArray<A>
  <A>(value: A, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(value: A, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(value: A): PrependArity1<A>
}

export interface PrependArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
