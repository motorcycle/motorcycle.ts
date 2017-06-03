import { curry2 } from '../curry'
import { BindArity2 } from './types'

export const bind: BindArity2 = curry2(function bind<that>(
  f: (...args: Array<any>) => any,
  obj: that
) {
  return function(...args: Array<any>) {
    return f.apply(obj, args)
  }
})
