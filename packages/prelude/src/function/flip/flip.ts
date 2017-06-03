import { apply } from '../apply'
import { curry2 } from '../curry'
import { Arity2 } from '../types'
import { FlipArity1 } from './types'

export const flip: FlipArity1 = <A, B, C>(f: Arity2<A, B, C>) =>
  curry2((a: A, b: B, ...args: Array<any>) => apply(f, [b, a, ...args]))
