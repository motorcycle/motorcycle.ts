export type ClampArity3 = {
  <A>(min: A, max: A, value: A): A
  <A>(min: A, max: A): ClampArity1<A>
  <A>(min: A): ClampArity2<A>
}

export type ClampArity2<A> = {
  (max: A, value: A): A
  (max: A): ClampArity1<A>
}

export type ClampArity1<A> = {
  (value: A): A
}
