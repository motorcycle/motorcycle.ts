import { curry3 } from '../../function/curry'
import { clone } from '../clone'

export const set: SetArity3 = curry3(function set<O extends object>(
  key: keyof O,
  value: O[typeof key],
  obj: O
): O {
  const clonedObj = clone(obj)

  clonedObj[key] = value

  return clonedObj
})

export interface SetArity3 {
  <O extends object>(key: keyof O, value: O[typeof key], obj: O): O

  <O extends object>(key: keyof O, value: O[typeof key]): SetArity1<O>
  <O extends object>(key: keyof O): SetArity2<O, typeof key>
}

export interface SetArity2<O extends object, K extends keyof O> {
  (value: O[K], obj: O): O

  (value: O[K]): SetArity1<O>
}

export type SetArity1<O extends object> = (obj: O) => O
