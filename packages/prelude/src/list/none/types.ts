export interface NoneArity2 {
  <A>(f: (a: A) => boolean, list: ArrayLike<A>): boolean
  <A>(f: (a: A) => boolean, list: Array<A>): boolean
  <A>(f: (a: A) => boolean, list: ReadonlyArray<A>): boolean

  <A>(f: (a: A) => boolean): NoneArity1<A>
}

export interface NoneArity1<A> {
  (list: ArrayLike<A>): boolean
  (list: Array<A>): boolean
  (list: ReadonlyArray<A>): boolean
}
