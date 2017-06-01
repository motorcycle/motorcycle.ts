import { curry2 } from '../../function/curry'
import { RejectArity2 } from './types'

/**
 * Takes a predicate and a "filterable", and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate.
 * Dispatches to the filter method of the second argument, if present.
 */
export const reject: RejectArity2 = curry2(
  function reject<A>(predicate: (a: A) => boolean, list: Array<A>): any {
    const length = list.length
    const newList = []

    for (let i = 0; i < length; ++i)
      if (!predicate(list[i]))
        newList.push(list[i])

    return newList
  }
)
