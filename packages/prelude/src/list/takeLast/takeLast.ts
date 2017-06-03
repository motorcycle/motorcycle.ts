import { curry2 } from '../../function/curry'
import { drop } from '../drop'
import { TakeLastArity2 } from './types'

export const takeLast: TakeLastArity2 = curry2(<A>(n: number, list: Array<A>) =>
  drop(n >= 0 ? list.length - n : 0, list)
)
