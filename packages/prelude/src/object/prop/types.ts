export interface PropArity2 {
  <A>(prop: keyof A, obj: A): A[typeof prop]

  <A>(prop: keyof A): (obj: A) => A[typeof prop]
}
