export interface InsertArity3 {
  <A>(index: number, value: A, list: Array<A>): ReadonlyArray<A>
  <A>(index: number, value: A, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(index: number, value: A, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(index: number, value: A): InsertArity1<A>
  (index: number): InsertArity2
}

export interface InsertArity2 {
  <A>(value: A, list: Array<A>): ReadonlyArray<A>
  <A>(value: A, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(value: A, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(value: A): InsertArity1<A>
}

export interface InsertArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
