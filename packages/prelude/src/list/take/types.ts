export interface TakeArity2 {
  (amount: number, str: string): string
  <A>(amount: number, list: Array<A>): ReadonlyArray<A>
  <A>(amount: number, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(amount: number, list: ReadonlyArray<A>): ReadonlyArray<A>

  (amount: number): TakeArity1
}

export interface TakeArity1 {
  <A>(list: Array<A>): ReadonlyArray<A>
  <A>(list: ArrayLike<A>): ReadonlyArray<A>
  <A>(list: ReadonlyArray<A>): ReadonlyArray<A>
}
