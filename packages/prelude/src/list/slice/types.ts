export interface SliceArity3 {
  (start: number, end: number, str: string): string
  <A>(start: number, end: number, list: Array<A>): ReadonlyArray<A>
  <A>(start: number, end: number, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(start: number, end: number, list: ReadonlyArray<A>): ReadonlyArray<A>

  (start: number): SliceArity2
  (start: number, end: number): SliceArity1
}

export interface SliceArity2 {
  (end: number, str: string): string
  <A>(end: number, list: Array<A>): ReadonlyArray<A>
  <A>(end: number, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(end: number, list: ReadonlyArray<A>): ReadonlyArray<A>

  (end: number): SliceArity1
}

export interface SliceArity1 {
  (str: string): string
  <A>(list: Array<A>): ReadonlyArray<A>
  <A>(list: ArrayLike<A>): ReadonlyArray<A>
  <A>(list: ReadonlyArray<A>): ReadonlyArray<A>
}
