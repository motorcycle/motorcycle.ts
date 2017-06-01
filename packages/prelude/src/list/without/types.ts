export interface WithoutArity2 {
  <A>(values: Array<A>, list: Array<A>): ReadonlyArray<A>
  <A>(values: Array<A>, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(values: Array<A>, list: ReadonlyArray<A>): ReadonlyArray<A>
  <A>(values: ArrayLike<A>, list: Array<A>): ReadonlyArray<A>
  <A>(values: ArrayLike<A>, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(values: ArrayLike<A>, list: ReadonlyArray<A>): ReadonlyArray<A>
  <A>(values: ReadonlyArray<A>, list: Array<A>): ReadonlyArray<A>
  <A>(values: ReadonlyArray<A>, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(values: ReadonlyArray<A>, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(values: Array<A>): WithoutArity1<A>
  <A>(values: ArrayLike<A>): WithoutArity1<A>
  <A>(values: ReadonlyArray<A>): WithoutArity1<A>
}

export interface WithoutArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
