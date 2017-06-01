export interface DropRepeatsWithArity2 {
  <A>(f: (a: A, b: A) => boolean, list: Array<A>): ReadonlyArray<A>
  <A>(f: (a: A, b: A) => boolean, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(f: (a: A, b: A) => boolean, list: ReadonlyArray<A>): ReadonlyArray<A>

  <A>(f: (a: A, b: A) => boolean): DropRepeatsWithArity1<A>
}

export interface DropRepeatsWithArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}

export interface DropRepeats {
  <A>(list: Array<A>): ReadonlyArray<A>
  <A>(list: ArrayLike<A>): ReadonlyArray<A>
  <A>(list: ReadonlyArray<A>): ReadonlyArray<A>
}
