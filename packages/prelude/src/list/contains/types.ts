export interface ContainsArity2 {
  <A>(value: A, list: Array<A>): boolean
  <A>(value: A, list: ArrayLike<A>): boolean
  <A>(value: A, list: ReadonlyArray<A>): boolean

  <A>(value: A): ContainsArity1<A>
}

export interface ContainsArity1<A> {
  (list: Array<A>): boolean
  (list: ArrayLike<A>): boolean
  (list: ReadonlyArray<A>): boolean
}
