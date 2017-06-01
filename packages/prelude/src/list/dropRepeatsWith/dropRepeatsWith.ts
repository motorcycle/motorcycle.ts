import { DropRepeats, DropRepeatsWithArity2 } from './types'

import { curry2 } from '../../function/curry'
import { equals } from '../../relation/equals'

/**
 * Returns a new list without any consecutively repeating elements.
 * Equality is determined by applying the supplied predicate to each pair of
 * consecutive elements. The first element in a series of equal elements will be preserved.
 */
export const dropRepeatsWith: DropRepeatsWithArity2 = curry2(
  function <A> (f: (a: A, b: A) => boolean, list: Array<A>): Array<A> {
    const length = list.length
    const newList = [ list[0] ]

    let lastUniqueIndex = 0

    for (let i = 1; i < length; ++i)
    {
      const b = list[i]

      if (!f(list[lastUniqueIndex], b)) {
        lastUniqueIndex = i
        newList.push(b)
      }
    }

    return newList
  }
)

/**
 * Returns a new list without any consecutively repeating elements.
 * Uses value equality to determine equality.
 */
export const dropRepeats: DropRepeats = dropRepeatsWith(equals)
