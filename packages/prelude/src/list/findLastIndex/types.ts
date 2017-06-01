export interface FindLastIndexArity2 {
  <A>(f: (a: A) => boolean, list: Array<A>): number
  <A>(f: (a: A) => boolean, list: ArrayLike<A>): number
  <A>(f: (a: A) => boolean, list: ReadonlyArray<A>): number

  <A>(f: (a: A) => boolean): FindLastIndexArity1<A>
}

export interface FindLastIndexArity1<A> {
  (list: Array<A>): number
  (list: ArrayLike<A>): number
  (list: ReadonlyArray<A>): number
}
