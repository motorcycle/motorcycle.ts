export interface PartitionArity2 {
  <A>(predicate: (a: A) => boolean, list: Array<A>): [ ReadonlyArray<A>, ReadonlyArray<A> ]
  <A>(predicate: (a: A) => boolean, list: ArrayLike<A>): [ ReadonlyArray<A>, ReadonlyArray<A> ]
  <A>(predicate: (a: A) => boolean, list: ReadonlyArray<A>): Readonly<[ ReadonlyArray<A>, ReadonlyArray<A> ]>

  <A>(predicate: (a: A) => boolean): PartitionArity1<A>
}

export interface PartitionArity1<A> {
  (list: Array<A>): [ ReadonlyArray<A>, ReadonlyArray<A> ]
  (list: ArrayLike<A>): [ ReadonlyArray<A>, ReadonlyArray<A> ]
  (list: ReadonlyArray<A>): Readonly<[ ReadonlyArray<A>, ReadonlyArray<A> ]>
}
