export interface IntersperseArity2 {
  <A>(item: A, list: Array<A>): ReadonlyArray<A>
  <A>(item: A, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(item: A, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(item: A): IntersperseArity1<A>
}

export interface IntersperseArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
