export interface HeadArity1 {
  (str: string): string
  <A>(list: Array<A>): A | void
  <A>(list: ArrayLike<A>): A | void
  <A>(list: ReadonlyArray<A>): A | void
}
