export interface DropWhileArity2 {
  <A>(f: (a: A) => boolean, list: Array<A>): ReadonlyArray<A>
  <A>(f: (a: A) => boolean, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(f: (a: A) => boolean, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(f: (a: A) => boolean): DropWhileArity1<A>
}

export interface DropWhileArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
