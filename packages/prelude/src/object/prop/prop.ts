import { curry2 } from '../../function/curry'
import { PropArity2 } from './types'

export const prop: PropArity2 = curry2(<A>(key: keyof A, obj: A): A[typeof key] => obj[key])
