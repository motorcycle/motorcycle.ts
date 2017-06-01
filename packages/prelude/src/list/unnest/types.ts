export interface UnnestArity1 {
  <A>(list: Array<Array<A>>): ReadonlyArray<A>
  <A>(list: Array<A | Array<A>>): ReadonlyArray<A>
}
