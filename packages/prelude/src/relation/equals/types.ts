export interface EqualsArity2 {
  <A>(a: A, b: A): boolean
  <A>(a: A): (b: A) => boolean
}
