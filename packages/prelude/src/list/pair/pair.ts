import { curry2 } from '../../function/curry'
import { PairArity2 } from './types'

export const pair: PairArity2 = curry2(<A, B>(a: A, b: B) => [a, b])
