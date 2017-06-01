export interface ZipWithArity3 {
  <A, B, C>(f: (a: A, b: B) => C, as: Array<A>, bs: Array<B>): ReadonlyArray<C>
  <A, B, C>(f: (a: A, b: B) => C, as: Array<A>, bs: ArrayLike<B>): ReadonlyArray<C>
  <A, B, C>(f: (a: A, b: B) => C, as: Array<A>, bs: ReadonlyArray<B>): ReadonlyArray<C>

  <A, B, C>(f: (a: A, b: B) => C, as: ArrayLike<A>, bs: Array<B>): ReadonlyArray<C>
  <A, B, C>(f: (a: A, b: B) => C, as: ArrayLike<A>, bs: ArrayLike<B>): ReadonlyArray<C>
  <A, B, C>(f: (a: A, b: B) => C, as: ArrayLike<A>, bs: ReadonlyArray<B>): ReadonlyArray<C>

  <A, B, C>(f: (a: A, b: B) => C, as: ReadonlyArray<A>, bs: Array<B>): ReadonlyArray<C>
  <A, B, C>(f: (a: A, b: B) => C, as: ReadonlyArray<A>, bs: ArrayLike<B>): ReadonlyArray<C>
  <A, B, C>(f: (a: A, b: B) => C, as: ReadonlyArray<A>, bs: ReadonlyArray<B>): ReadonlyArray<C>

  <A, B, C>(f: (a: A, b: B) => C, as: Array<A>): ZipWithArity1<B, C>
  <A, B, C>(f: (a: A, b: B) => C, as: ArrayLike<A>): ZipWithArity1<B, C>
  <A, B, C>(f: (a: A, b: B) => C, as: ReadonlyArray<A>): ZipWithArity1<B, C>

  <A, B, C>(f: (a: A, b: B) => C): ZipWithArity2<A, B, C>
}

export interface ZipWithArity2<A, B, C> {
  (as: Array<A>, bs: Array<B>): ReadonlyArray<C>
  (as: Array<A>, bs: ArrayLike<B>): ReadonlyArray<C>
  (as: Array<A>, bs: ReadonlyArray<B>): ReadonlyArray<C>

  (as: ArrayLike<A>, bs: Array<B>): ReadonlyArray<C>
  (as: ArrayLike<A>, bs: ArrayLike<B>): ReadonlyArray<C>
  (as: ArrayLike<A>, bs: ReadonlyArray<B>): ReadonlyArray<C>

  (as: ReadonlyArray<A>, bs: Array<B>): ReadonlyArray<C>
  (as: ReadonlyArray<A>, bs: ArrayLike<B>): ReadonlyArray<C>
  (as: ReadonlyArray<A>, bs: ReadonlyArray<B>): ReadonlyArray<C>
}

export interface ZipWithArity1<B, C> {
  (bs: Array<B>): ReadonlyArray<C>
  (bs: ArrayLike<B>): ReadonlyArray<C>
  (bs: ReadonlyArray<B>): ReadonlyArray<C>
}
