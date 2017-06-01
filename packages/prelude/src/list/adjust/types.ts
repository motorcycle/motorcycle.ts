export interface AdjustArity3 {
  <A>(f: (a: A) => A, index: number, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(f: (a: A) => A, index: number, list: Array<A>): ReadonlyArray<A>
  <A>(f: (a: A) => A, index: number, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(f: (a: A) => A, index: number): AdjustArity1<A>
  <A>(f: (a: A) => A): AdjustArity2<A>
}

export interface AdjustArity2<A> {
  (index: number, list: ArrayLike<A>): ReadonlyArray<A>
  (index: number, list: Array<A>): ReadonlyArray<A>
  (index: number, list: ReadonlyArray<A>): ReadonlyArray<A>

  (index: number): AdjustArity1<A>
}

export interface AdjustArity1<A> {
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: Array<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
