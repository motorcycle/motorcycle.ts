export interface UpdateArity3 {
  <A>(index: number, value: A, list: Array<A>): ReadonlyArray<A>
  <A>(index: number, value: A, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(index: number, value: A, list: ReadonlyArray<A>): ReadonlyArray<A>

  (index: number): UpdateArity2
  <A>(index: number, value: A): UpdateArity1<A>
}

export interface UpdateArity2 {
  <A>(value: A, list: Array<A>): ReadonlyArray<A>
  <A>(value: A, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(value: A, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(value: A): UpdateArity1<A>
}

export interface UpdateArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
