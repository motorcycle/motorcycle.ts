export interface UniqByArity2 {
  <A, B>(f: (a: A) => B, list: Array<A>): ReadonlyArray<A>
  <A, B>(f: (a: A) => B, list: ArrayLike<A>): ReadonlyArray<A>
  <A, B>(f: (a: A) => B, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A, B>(f: (a: A) => B): UniqByArity1<A>
}

export interface UniqByArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
