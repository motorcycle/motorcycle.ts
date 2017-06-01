export interface ConcatArity2 {
  <A>(list1: Array<A>, list2: Array<A>): ReadonlyArray<A>
  <A>(list1: Array<A>, list2: ArrayLike<A>): ReadonlyArray<A>
  <A>(list1: Array<A>, list2: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(list1: ArrayLike<A>, list2: Array<A>): ReadonlyArray<A>
  <A>(list1: ArrayLike<A>, list2: ArrayLike<A>): ReadonlyArray<A>
  <A>(list1: ArrayLike<A>, list2: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(list1: ReadonlyArray<A>, list2: Array<A>): ReadonlyArray<A>
  <A>(list1: ReadonlyArray<A>, list2: ArrayLike<A>): ReadonlyArray<A>
  <A>(list1: ReadonlyArray<A>, list2: ReadonlyArray<A>): ReadonlyArray<A>

  (str1: string, str2: string): string

  <A>(list1: Array<A>): (list2: Array<A>) => ReadonlyArray<A>
  <A>(list1: ReadonlyArray<A>): (list2: ReadonlyArray<A>) => ReadonlyArray<A>
  (str1: string): (str2: string) => string
}
