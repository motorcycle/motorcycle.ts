export interface RemoveArity3 {
  <A>(index: number, amount: number, list: Array<A>): ReadonlyArray<A>
  <A>(index: number, amount: number, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(index: number, amount: number, list: ReadonlyArray<A>): ReadonlyArray<A>

  (index: number, amount: number): RemoveArity1
  (index: number): RemoveArity2
}

export interface RemoveArity2 {
  <A>(amount: number, list: Array<A>): ReadonlyArray<A>
  <A>(amount: number, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(amount: number, list: ReadonlyArray<A>): ReadonlyArray<A>

  (amount: number): RemoveArity1
}

export interface RemoveArity1 {
  <A>(list: Array<A>): ReadonlyArray<A>
  <A>(list: ArrayLike<A>): ReadonlyArray<A>
  <A>(list: ReadonlyArray<A>): ReadonlyArray<A>
}
