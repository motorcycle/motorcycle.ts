export interface InsertAllArity3 {
  <A>(index: number, values: Array<A>, list: Array<A>): ReadonlyArray<A>
  <A>(index: number, values: Array<A>, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(index: number, values: Array<A>, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(index: number, values: Array<A>): InsertAllArity1<A>
  (index: number): InsertAllArity2
}

export interface InsertAllArity2 {
  <A>(values: Array<A>, list: Array<A>): ReadonlyArray<A>
  <A>(values: Array<A>, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(values: Array<A>, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(values: Array<A>): InsertAllArity1<A>
}

export interface InsertAllArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
