export interface IndexByArity2 {
  <A>(f: (a: A) => string, list: Array<A>): { readonly [key: string]: A }
  <A>(f: (a: A) => string, list: ArrayLike<A>): { readonly [key: string]: A }
  <A>(f: (a: A) => string, list: ReadonlyArray<A>): { readonly [key: string]: A }

  <A>(f: (a: A) => string): IndexByArity1<A>
}

export interface IndexByArity1<A> {
  (list: Array<A>): { readonly [key: string]: A }
  (list: ArrayLike<A>): { readonly [key: string]: A }
  (list: ReadonlyArray<A>): { readonly [key: string]: A }
}
