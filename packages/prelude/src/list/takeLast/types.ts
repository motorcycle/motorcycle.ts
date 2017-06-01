export interface TakeLastArity2 {
  (amount: number, str: string): string
  <A>(amount: number, list: Array<A>): ReadonlyArray<A>
  <A>(amount: number, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(amount: number, list: ReadonlyArray<A>): ReadonlyArray<A>

  (amount: number): TakeLastArity1
}

export interface TakeLastArity1 {
  <A>(list: Array<A>): ReadonlyArray<A>
  <A>(list: ArrayLike<A>): ReadonlyArray<A>
  <A>(list: ReadonlyArray<A>): ReadonlyArray<A>
}
