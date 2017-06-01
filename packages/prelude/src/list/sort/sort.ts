import { Comparator } from '../../function'
import { curry2 } from '../../function/curry'
import { SortArity2 } from './types'

export const sort: SortArity2 =
  curry2(<A>(c: Comparator<A>, list: Array<A>) => Array.prototype.slice.call(list, 0).sort(c))
