import { apply } from '../apply'
import { curry2 } from '../curry'
import { ArityN } from '../types'
import { CurryNFn } from './types'

export const curryN: CurryNFn =
  curry2((arity: number, f: ArityN<any>) => curriedN(arity, f, []))

function curriedN(arity: number, f: ArityN<any>, previousArgs: Array<any>): ArityN<any> {
  if (arity <= 1)
    return f

  return function (...args: Array<any>) {
    const concatArgs = previousArgs.concat(args)

    if (concatArgs.length >= arity)
      return apply(f, concatArgs)

    return curriedN(arity, f, concatArgs)
  }
}
