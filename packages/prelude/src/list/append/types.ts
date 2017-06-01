export interface AppendArity2 {
  <A>(a: A, list: Array<A>): ReadonlyArray<A>
  <A>(a: A, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(a: A, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(a: A): AppendArity1<A>
}

export interface AppendArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
