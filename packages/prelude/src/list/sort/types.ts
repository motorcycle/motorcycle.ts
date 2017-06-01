import { Comparator } from '../../function'

export interface SortArity2 {
  <A>(comparision: Comparator<A>, list: Array<A>): ReadonlyArray<A>
  <A>(comparision: Comparator<A>, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(comparision: Comparator<A>, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(comparision: Comparator<A>): SortArity1<A>
}

export interface SortArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
