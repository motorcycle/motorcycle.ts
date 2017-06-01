export interface GroupByArity2 {
  <A>(f: (value: A) => string, list: Array<A>): { readonly [key: string]: ReadonlyArray<A> }
  <A>(f: (value: A) => string, list: ArrayLike<A>): { readonly [key: string]: ReadonlyArray<A> }
  <A>(f: (value: A) => string, list: ReadonlyArray<A>): { readonly [key: string]: ReadonlyArray<A> }

  <A>(f: (value: A) => string): GroupByArity1<A>
}

export interface GroupByArity1<A> {
  (list: Array<A>): { readonly [key: string]: ReadonlyArray<A> }
  (list: ArrayLike<A>): { readonly [key: string]: ReadonlyArray<A> }
  (list: ReadonlyArray<A>): { readonly [key: string]: ReadonlyArray<A> }
}
