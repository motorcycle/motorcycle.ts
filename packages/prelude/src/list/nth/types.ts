export interface NthArity2 {
  (index: number, str: string): string
  <A>(index: number, list: Array<A>): A | void
  <A>(index: number, list: ArrayLike<A>): A | void
  <A>(index: number, list: ReadonlyArray<A>): A | void

  (index: number): NthArity1
}

export interface NthArity1 {
  (str: string): string
  <A>(list: Array<A>): A | void
  <A>(list: ArrayLike<A>): A | void
  <A>(list: ReadonlyArray<A>): A | void
}
