export interface RepeatArity2 {
  <A>(value: A, amount: 0): ReadonlyArray<never>
  <A>(value: A, amount: 1): [A]
  <A>(value: A, amount: 2): [A, A]
  <A>(value: A, amount: 3): [A, A, A]
  <A>(value: A, amount: 4): [A, A, A, A]
  <A>(value: A, amount: 5): [A, A, A, A, A]
  <A>(value: A, amount: 6): [A, A, A, A, A, A]
  <A>(value: A, amount: 7): [A, A, A, A, A, A, A]
  <A>(value: A, amount: 8): [A, A, A, A, A, A, A, A]
  <A>(value: A, amount: 9): [A, A, A, A, A, A, A, A, A]
  <A>(value: A, amount: 10): [A, A, A, A, A, A, A, A, A, A]
  <A>(value: A, amount: number): ReadonlyArray<A>

  <A>(value: A): RepeatArity1<A>
}

export interface RepeatArity1<A> {
  (amount: 0): ReadonlyArray<never>
  (amount: 1): [A]
  (amount: 2): [A, A]
  (amount: 3): [A, A, A]
  (amount: 4): [A, A, A, A]
  (amount: 5): [A, A, A, A, A]
  (amount: 6): [A, A, A, A, A, A]
  (amount: 7): [A, A, A, A, A, A, A]
  (amount: 8): [A, A, A, A, A, A, A, A]
  (amount: 9): [A, A, A, A, A, A, A, A, A]
  (amount: 10): [A, A, A, A, A, A, A, A, A, A]
  (amount: number): ReadonlyArray<A>
}
