import { curry2 } from '../curry'
import { ApplyArity2 } from './types'

export const apply: ApplyArity2 = curry2(
  // tslint:disable-next-line:cyclomatic-complexity
  function apply<A>(f: (...args: Array<any>) => A, list: Array<any>): A {
    switch (list.length) {
      case 0: return f()
      case 1: return f(list[0])
      case 2: return f(list[0], list[1])
      case 3: return f(list[0], list[1], list[2])
      case 4: return f(list[0], list[1], list[2], list[3])
      case 5: return f(list[0], list[1], list[2], list[3], list[4])
      default: return f.apply(null, list)
    }
  }
)
