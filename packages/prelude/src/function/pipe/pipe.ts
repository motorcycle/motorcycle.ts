import { reduce } from '../../list/reduce'
import { PipeFn } from './types'

export const pipe: PipeFn = function compose<A, B>(...fns: Array<Function>) {
  // tslint:disable-next-line:cyclomatic-complexity
  return function(a: A): B {
    switch (fns.length) {
      case 1:
        return fns[0](a)
      case 2:
        return fns[1](fns[0](a))
      case 3:
        return fns[2](fns[1](fns[0](a)))
      case 4:
        return fns[3](fns[2](fns[1](fns[0](a))))
      case 5:
        return fns[4](fns[3](fns[2](fns[1](fns[0](a)))))
      default:
        return reduce((accumulator: any, value: Function) => value(accumulator), a, fns)
    }
  }
}
