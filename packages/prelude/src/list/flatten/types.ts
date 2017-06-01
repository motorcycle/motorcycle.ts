export interface FlattenArity1 {
  <A>(list: Array<Array<A>>): ReadonlyArray<A>
  <A>(list: Array<Array<Array<A>>>): ReadonlyArray<A>
  <A>(list: Array<Array<Array<Array<A>>>>): ReadonlyArray<A>
  <A>(list: Array<Array<Array<Array<Array<A>>>>>): ReadonlyArray<A>
  <A>(list: Array<any>): Array<A>

  <A>(list: ArrayLike<ArrayLike<A>>): ReadonlyArray<A>
  <A>(list: ArrayLike<ArrayLike<ArrayLike<A>>>): ReadonlyArray<A>
  <A>(list: ArrayLike<ArrayLike<ArrayLike<ArrayLike<A>>>>): ReadonlyArray<A>
  <A>(list: ArrayLike<ArrayLike<ArrayLike<ArrayLike<ArrayLike<A>>>>>): ReadonlyArray<A>
  <A>(list: ArrayLike<any>): ReadonlyArray<A>

  <A>(list: ReadonlyArray<ReadonlyArray<A>>): ReadonlyArray<A>
  <A>(list: ReadonlyArray<ReadonlyArray<ReadonlyArray<A>>>): ReadonlyArray<A>
  <A>(list: ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<A>>>>): ReadonlyArray<A>
  <A>(list: ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<ReadonlyArray<A>>>>>): ReadonlyArray<A>
  <A>(list: ReadonlyArray<any>): ReadonlyArray<A>
}
