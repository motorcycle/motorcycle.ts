export interface PropEqArity3 {
  <O extends object>(key: keyof O, value: O[typeof key], object: O): boolean

  <O extends object>(key: keyof O): (value: O[typeof key], object: O) => boolean
  <O extends object>(key: keyof O, value: O[typeof key]): (object: O) => boolean

  <O extends object>(key: keyof O): (value: O[typeof key]) => (object: O) => boolean
}
