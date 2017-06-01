export interface PairArity2 {
  <A, B>(a: A, b: B): [A, B]

  <A>(a: A): PairArity1<A>
}

export type PairArity1<A> = <B>(b: B) => [A, B]
