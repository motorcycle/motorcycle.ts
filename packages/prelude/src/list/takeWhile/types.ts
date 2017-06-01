export interface TakeWhileArity2 {
  (f: (s: string) => boolean, str: string): string
  <A>(f: (a: A) => boolean, list: Array<A>): ReadonlyArray<A>
  <A>(f: (a: A) => boolean, list: ArrayLike<A>): ReadonlyArray<A>
  <A>(f: (a: A) => boolean, list: ReadonlyArray<A>): ReadonlyArray<A>

  (f: (s: string) => boolean): (str: string) => string
  <A>(f: (a: A) => boolean): TakeWhileArity1<A>
}

export interface TakeWhileArity1<A> {
  (list: Array<A>): ReadonlyArray<A>
  (list: ArrayLike<A>): ReadonlyArray<A>
  (list: ReadonlyArray<A>): ReadonlyArray<A>
}
