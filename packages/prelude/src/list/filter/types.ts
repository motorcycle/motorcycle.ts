export interface FilterArity2 {
  <A>(f: (a: A, index: number) => boolean, list: Array<A>): ReadonlyArray<A>
  <A>(f: (a: A, index: number) => boolean, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(f: (a: A, index: number) => boolean, list: ReadonlyArray<A>): ReadonlyArray<A>
  <A>(f: (a: A) => boolean, list: Array<A>): ReadonlyArray<A>
  <A>(f: (a: A) => boolean, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(f: (a: A) => boolean, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(f: (a: A, index: number) => boolean): FilterArity1<A>
  <A>(f: (a: A) => boolean): FilterArity1<A>
}

export interface FilterArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
