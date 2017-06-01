export interface ReverseArity1 {
  <A>(list: Array<A>): ReadonlyArray<A>
  <A>(list: ArrayLike<A>): ReadonlyArray<A>
  <A>(list: ReadonlyArray<A>): ReadonlyArray<A>
}
