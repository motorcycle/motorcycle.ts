export interface SplitEveryArity2 {
  (amount: number, str: string): ReadonlyArray<string>
  <A>(amount: number, list: Array<A>): ReadonlyArray<ReadonlyArray<A>>
  <A>(amount: number, list: ArrayLike<A>): ReadonlyArray<ReadonlyArray<A>>
  <A>(amount: number, list: ReadonlyArray<A>): ReadonlyArray<ReadonlyArray<A>>

  (amount: number): SplitEveryArity1
}

export interface SplitEveryArity1 {
  (str: string): ReadonlyArray<string>
  <A>(list: Array<A>): ReadonlyArray<ReadonlyArray<A>>
  <A>(list: ArrayLike<A>): ReadonlyArray<ReadonlyArray<A>>
  <A>(list: ReadonlyArray<A>): ReadonlyArray<ReadonlyArray<A>>
}
