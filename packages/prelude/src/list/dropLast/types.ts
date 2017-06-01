export interface DropLastArity2 {
  <A>(n: number, list: Array<A>): ReadonlyArray<A>
  <A>(n: number, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(n: number, list: ReadonlyArray<A>): ReadonlyArray<A>
  (n: number, str: string): string

  (n: number): DropLastArity1
}

export interface DropLastArity1 {
  <A>(list: Array<A>): ReadonlyArray<A>
  <A>(list: ArrayLike<A>): ReadonlyArray<A>
  <A>(list: ReadonlyArray<A>): ReadonlyArray<A>
  (str: string): string
}
