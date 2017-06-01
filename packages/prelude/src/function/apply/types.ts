export interface ApplyArity2 {
  <A, B>(f: (a: A) => B, list: [A]): B
  <A, B, C>(f: (a: A, b: B) => C, list: [A, B]): C
  <A, B, C, D>(f: (a: A, b: B, c: C) => D, list: [A, B, C]): D
  <A, B, C, D, E>(f: (a: A, b: B, c: C, d: D) => E, list: [A, B, C, D]): E
  <A, B, C, D, E, F>(f: (a: A, b: B, c: C, d: D, e: E) => F, list: [A, B, C, D, E]): F

  <A, B>(f: (a: A) => B): (list: [A]) => B
  <A, B, C>(f: (a: A, b: B) => C): (list: [A, B]) => C
  <A, B, C, D>(f: (a: A, b: B, c: C) => D): (list: [A, B, C]) => D
  <A, B, C, D, E>(f: (a: A, b: B, c: C, d: D) => E): (list: [A, B, C, D]) => E
  <A, B, C, D, E, F>(f: (a: A, b: B, c: C, d: D, e: E) => F): (list: [A, B, C, D, E]) => F

  <A>(f: (...args: Array<any>) => A, list: Array<any>): A
  <A>(f: (...args: Array<any>) => A, list: ArrayLike<any>): A
  <A>(f: (...args: Array<any>) => A, list: ReadonlyArray<any>): A

  <A>(f: (...args: Array<any>) => A): ApplyArity1<A>
}

export interface ApplyArity1<A> {
  (list: Array<any>): A
  (list: ArrayLike<any>): A
  (list: ReadonlyArray<any>): A
}
