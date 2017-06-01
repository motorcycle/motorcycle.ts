import { curry2 } from '../../function/curry'
import { JoinArity2 } from './types'

export const join: JoinArity2 =
  curry2(<A>(separator: string, list: Array<A>): string => list.join(separator))
