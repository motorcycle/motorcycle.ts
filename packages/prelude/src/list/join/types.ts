export interface JoinArity2 {
  <A>(str: string, list: Array<A>): string
  <A>(str: string, list: ArrayLike<A>): string
  <A>(str: string, list: ReadonlyArray<A>): string

  (str: string): JoinArity1
}

export interface JoinArity1 {
  <A>(list: Array<A>): string
  <A>(list: ArrayLike<A>): string
  <A>(list: ReadonlyArray<A>): string
}
