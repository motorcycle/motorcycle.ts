export interface RejectArity2 {
  <A>(f: (a: A) => boolean, list: Array<A>): ReadonlyArray<A>
  <A>(f: (a: A) => boolean, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(f: (a: A) => boolean, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(f: (a: A) => boolean): RejectArity1<A>
}

export interface RejectArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
