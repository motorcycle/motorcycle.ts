import { curry2 } from '../../function/curry'
import { GroupWithArity2 } from './types'

/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all "equal" according to the provided equality function.
 */
export const groupWith: GroupWithArity2 = curry2(
  function groupWith<A>(f: (a: A, b: A) => boolean, list: Array<A>): Array<Array<A>> {
    const length = list.length
    const newList: Array<Array<A>> = []

    let innerList: Array<A> = [ list[0] ]

    for (let i = 1; i < length; ++i)
    {
      const previous = innerList[innerList.length - 1]
      const current = list[i]

      const equal = f(previous, current)

      if (!equal) {
        newList.push(innerList)
        innerList = []
      }

      innerList.push(current)
    }

    newList.push(innerList)

    return newList
  }
)
