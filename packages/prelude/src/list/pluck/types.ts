export interface PluckArity2 {
  <A>(prop: keyof A, list: Array<A>): ReadonlyArray<A[typeof prop]>
  <A>(prop: keyof A, list: ArrayLike<A>): ReadonlyArray<A[typeof prop]>
  <A>(prop: keyof A, list: ReadonlyArray<A>): ReadonlyArray<A[typeof prop]>

  <A>(prop: keyof A): PluckArity1<A, typeof prop>
}

export interface PluckArity1<A, K extends keyof A> {
  (list: Array<A>): ReadonlyArray<A[K]>
  (list: ArrayLike<A>): ReadonlyArray<A[K]>
  (list: ReadonlyArray<A>): ReadonlyArray<A[K]>
}
