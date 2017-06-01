export interface AnyArity2 {
  <A>(f: (a: A) => boolean, list: ArrayLike<A>): boolean
  <A>(f: (a: A) => boolean, list: Array<A>): boolean
  <A>(f: (a: A) => boolean, list: ReadonlyArray<A>): boolean

  <A>(f: (a: A) => boolean): AnyArity1<A>
}

export interface AnyArity1<A> {
  (list: ArrayLike<A>): boolean
  (list: Array<A>): boolean
  (list: ReadonlyArray<A>): boolean
}
