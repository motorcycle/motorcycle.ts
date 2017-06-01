export interface ApertureArity2 {
  <A>(n: 0, list: Array<A>): ReadonlyArray<never>
  <A>(n: 1, list: Array<A>): ReadonlyArray<[A]> | ReadonlyArray<never>
  <A>(n: 2, list: Array<A>): ReadonlyArray<[A, A]> | ReadonlyArray<never>
  <A>(n: 3, list: Array<A>): ReadonlyArray<[A, A, A]> | ReadonlyArray<never>
  <A>(n: 4, list: Array<A>): ReadonlyArray<[A, A, A, A]> | ReadonlyArray<never>
  <A>(n: 5, list: Array<A>): ReadonlyArray<[A, A, A, A, A]> | ReadonlyArray<never>
  <A>(n: 6, list: Array<A>): ReadonlyArray<[A, A, A, A, A, A]> | ReadonlyArray<never>
  <A>(n: 7, list: Array<A>): ReadonlyArray<[A, A, A, A, A, A, A]> | ReadonlyArray<never>
  <A>(n: 8, list: Array<A>): ReadonlyArray<[A, A, A, A, A, A, A, A]> | ReadonlyArray<never>
  <A>(n: 9, list: Array<A>): ReadonlyArray<[A, A, A, A, A, A, A, A, A]> | ReadonlyArray<never>
  <A>(n: number, list: Array<A>): ReadonlyArray<ReadonlyArray<A>>
  <A>(n: number, list: ArrayLike<A>): ReadonlyArray<ReadonlyArray<A>>

  <A>(n: 0, list: ReadonlyArray<A>): ReadonlyArray<never>
  <A>(n: 1, list: ReadonlyArray<A>): ReadonlyArray<[A]> | ReadonlyArray<never>
  <A>(n: 2, list: ReadonlyArray<A>): ReadonlyArray<[A, A]> | ReadonlyArray<never>
  <A>(n: 3, list: ReadonlyArray<A>): ReadonlyArray<[A, A, A]> | ReadonlyArray<never>
  <A>(n: 4, list: ReadonlyArray<A>): ReadonlyArray<[A, A, A, A]> | ReadonlyArray<never>
  <A>(n: 5, list: ReadonlyArray<A>): ReadonlyArray<[A, A, A, A, A]> | ReadonlyArray<never>
  <A>(n: 6, list: ReadonlyArray<A>): ReadonlyArray<[A, A, A, A, A, A]> | ReadonlyArray<never>
  <A>(n: 7, list: ReadonlyArray<A>): ReadonlyArray<[A, A, A, A, A, A, A]> | ReadonlyArray<never>
  <A>(n: 8, list: ReadonlyArray<A>): ReadonlyArray<[A, A, A, A, A, A, A, A]> | ReadonlyArray<never>
  <A>(n: 9, list: ReadonlyArray<A>): ReadonlyArray<[A, A, A, A, A, A, A, A, A]> | ReadonlyArray<never>
  <A>(n: number, list: ReadonlyArray<A>): ReadonlyArray<ReadonlyArray<A>>

  (n: number): ApertureArity1
}

export interface ApertureArity1 {
  <A>(list: Array<A>): ReadonlyArray<ReadonlyArray<A>>
  <A>(list: ArrayLike<A>): ReadonlyArray<ReadonlyArray<A>>
  <A>(list: ReadonlyArray<A>): ReadonlyArray<ReadonlyArray<A>>
}
