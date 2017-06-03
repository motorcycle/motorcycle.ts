import { curry2 } from '../../function/curry'
import { prop } from '../../object/prop'
import { map } from '../map'
import { PluckArity2 } from './types'

export const pluck: PluckArity2 = curry2(<A>(key: keyof A, list: Array<A>) =>
  map(prop<A>(key), list)
)
