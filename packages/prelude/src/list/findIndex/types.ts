export interface FindIndexArity2 {
  <A>(f: (a: A) => boolean, list: Array<A>): number
  <A>(f: (a: A) => boolean, list: ArrayLike<A>): number
  <A>(f: (a: A) => boolean, list: ReadonlyArray<A>): number

  <A>(f: (a: A) => boolean): FindIndexArity1<A>
}

export interface FindIndexArity1<A> {
  (list: Array<A>): number
  (list: ArrayLike<A>): number
  (list: ReadonlyArray<A>): number
}
