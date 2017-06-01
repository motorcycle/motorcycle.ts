export interface DropArity2 {
  <A>(n: number, list: Array<A>): ReadonlyArray<A>
  <A>(n: number, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(n: number, list: ReadonlyArray<A>): ReadonlyArray<A>
  (n: number, str: string): string

  (n: number): DropArity1
}

export interface DropArity1 {
  <A>(list: Array<A>): ReadonlyArray<A>
  <A>(list: ArrayLike<A>): ReadonlyArray<A>
  <A>(list: ReadonlyArray<A>): ReadonlyArray<A>
  (str: string): string
}
