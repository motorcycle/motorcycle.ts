export interface ZipArity2 {
  <A, B>(xs: Array<A>, ys: Array<B>): ReadonlyArray<[A, B]>
  <A, B>(xs: Array<A>, ys: ArrayLike<B>): ReadonlyArray<[A, B]>
  <A, B>(xs: Array<A>, ys: ReadonlyArray<B>): ReadonlyArray<[A, B]>
  <A, B>(xs: ArrayLike<A>, ys: Array<B>): ReadonlyArray<[A, B]>
  <A, B>(xs: ArrayLike<A>, ys: ArrayLike<B>): ReadonlyArray<[A, B]>
  <A, B>(xs: ArrayLike<A>, ys: ReadonlyArray<B>): ReadonlyArray<[A, B]>
  <A, B>(xs: ReadonlyArray<A>, ys: Array<A>): ReadonlyArray<[A, B]>
  <A, B>(xs: ReadonlyArray<A>, ys: ArrayLike<A>): ReadonlyArray<[A, B]>
  <A, B>(xs: ReadonlyArray<A>, ys: ReadonlyArray<A>): ReadonlyArray<[A, B]>

  <A>(xs: Array<A>): ZipArity1<A>
  <A>(xs: ArrayLike<A>): ZipArity1<A>
  <A>(xs: ReadonlyArray<A>): ZipArity1<A>
}

export interface ZipArity1<A> {
  <B>(xs: Array<A>): ReadonlyArray<[A, B]>
  <B>(xs: ArrayLike<A>): ReadonlyArray<[A, B]>
  <B>(xs: ReadonlyArray<A>): ReadonlyArray<[A, B]>
}
