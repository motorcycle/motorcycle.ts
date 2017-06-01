export interface DropLastWhileArity2 {
  <A>(f: (a: A) => boolean, list: Array<A>): ReadonlyArray<A>
  <A>(f: (a: A) => boolean, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(f: (a: A) => boolean, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(f: (a: A) => boolean): DropLastWhileArity1<A>
}

export interface DropLastWhileArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
