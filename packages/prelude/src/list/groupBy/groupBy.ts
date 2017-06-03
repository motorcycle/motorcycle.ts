import { curry2 } from '../../function/curry'
import { GroupByArity2 } from './types'

/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a String-returning function on each element, and grouping the
 * results according to values returned.
 */
export const groupBy: GroupByArity2 = curry2(function groupBy<A>(
  f: (value: A) => string,
  list: Array<A>
): { readonly [key: string]: Array<A> } {
  const length = list.length
  const obj: any = {}

  for (let i = 0; i < length; ++i) {
    const value = list[i]
    const key = f(value)

    if (obj[key]) obj[key].push(value)
    else obj[key] = [value]
  }

  return obj
})
