import { curry3 } from '../../function/curry'
import { PropEqArity3 } from './types'

export const propEq: PropEqArity3 = curry3(
  function <O extends object> (key: keyof O, value: O[typeof key], obj: O): boolean {
    return obj[key] === value
  }
)
