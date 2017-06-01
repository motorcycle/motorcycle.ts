export interface FindLastArity2 {
  <A>(f: (a: A) => boolean, list: Array<A>): A | void
  <A>(f: (a: A) => boolean, list: ArrayLike<A>): A | void
  <A>(f: (a: A) => boolean, list: ReadonlyArray<A>): A | void

  <A>(f: (a: A) => boolean): FindLastArity1<A>
}

export interface FindLastArity1<A> {
  (list: Array<A>): A | void
  (list: ArrayLike<A>): A | void
  (list: ReadonlyArray<A>): A | void
}
