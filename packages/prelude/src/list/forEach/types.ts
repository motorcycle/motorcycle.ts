export interface ForEachArity2 {
  <A>(f: (value: A, index: number) => any, list: Array<A>): ReadonlyArray<A>
  <A>(f: (value: A, index: number) => any, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(f: (value: A, index: number) => any, list: ReadonlyArray<A>): ReadonlyArray<A>
  <A>(f: (value: A) => any, list: Array<A>): ReadonlyArray<A>
  <A>(f: (value: A) => any, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(f: (value: A) => any, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(f: (value: A, index: number) => any): ForEachArity1<A>
  <A>(f: (value: A) => any): ForEachArity1<A>
}

export interface ForEachArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
