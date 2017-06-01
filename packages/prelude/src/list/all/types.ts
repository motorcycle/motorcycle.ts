export interface AllArity2 {
  <A>(f: (a: A) => boolean, list: Array<A>): boolean
  <A>(f: (a: A) => boolean, list: ArrayLike<A>): boolean
  <A>(f: (a: A) => boolean, list: ReadonlyArray<A>): boolean

  <A>(f: (a: A) => boolean): AllArity1<A>
}

export interface AllArity1<A> {
  (list: Array<A>): boolean
  (list: ArrayLike<A>): boolean
  (list: ReadonlyArray<A>): boolean
}
