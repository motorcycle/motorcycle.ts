import { reduceRight } from '../../list'
import { ComposeFn } from './types'

export const compose: ComposeFn = function compose<A, B>(...fns: Array<Function>) {
  // tslint:disable-next-line:cyclomatic-complexity
  return function(a: A): B {
    switch (fns.length) {
      case 1:
        return fns[0](a)
      case 2:
        return fns[0](fns[1](a))
      case 3:
        return fns[0](fns[1](fns[2](a)))
      case 4:
        return fns[0](fns[1](fns[2](fns[3](a))))
      case 5:
        return fns[0](fns[1](fns[2](fns[3](fns[4](a)))))
      default:
        return reduceRight((value: Function, accumulator: any) => value(accumulator), a, fns)
    }
  }
}
