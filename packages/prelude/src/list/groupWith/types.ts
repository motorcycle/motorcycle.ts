export interface GroupWithArity2 {
  <A>(predicate: (a: A, b: A) => boolean, list: Array<A>): ReadonlyArray<ReadonlyArray<A>>
  <A>(predicate: (a: A, b: A) => boolean, list: ArrayLike<A>): ReadonlyArray<ReadonlyArray<A>>
  <A>(predicate: (a: A, b: A) => boolean, list: ReadonlyArray<A>): ReadonlyArray<ReadonlyArray<A>>

  <A>(predicate: (a: A, b: A) => boolean): GroupWithArity1<A>
}

export interface GroupWithArity1<A> {
  (list: Array<A>): ReadonlyArray<ReadonlyArray<A>>
  (list: ArrayLike<A>): ReadonlyArray<ReadonlyArray<A>>
  (list: ReadonlyArray<A>): ReadonlyArray<ReadonlyArray<A>>
}
