import { append } from '../append'
import { concat } from '../concat'
import { isArrayLike } from '../isArrayLike'
import { reduce } from '../reduce'
import { FlattenArity1 } from './types'

/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 */
export const flatten: FlattenArity1 = function flatten<A>(list: Array<A>): ReadonlyArray<A> {
  return (reduce<A | ReadonlyArray<A>, ReadonlyArray<A>>(
    flattenReducer,
    [] as Array<A>,
    list
  ) as any) as ReadonlyArray<A>
} as FlattenArity1

function flattenReducer<A>(acc: Array<A>, value: A | Array<A>): ReadonlyArray<A> {
  return isArrayLike(value) ? concat(acc, flatten<A>(value)) : append(value, acc)
}
