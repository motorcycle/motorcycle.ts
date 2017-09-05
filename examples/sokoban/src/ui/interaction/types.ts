export type Keyed = {
  <A>(keys: { [key: string]: A }, key: string): A
  <A>(keys: { [key: string]: A }): KeyedArity1
}

export type KeyedArity1 = {
  <A>(key: string): A
}
