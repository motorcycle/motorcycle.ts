import { curry2 } from '../../function/curry'
import { IndexByArity2 } from './types'

/**
 * Given a function that generates a key, turns a list into an object indexing
 * the objects by the given key. Note that if multiple objects generate the
 * same value for the indexing key only the last value will be included in the
 * generated object.
 */
export const indexBy: IndexByArity2 = curry2(function indexBy<A>(
  f: (value: A) => string,
  list: Array<A>
): any {
  const length = list.length
  const obj: any = {}

  for (let i = 0; i < length; ++i) {
    const value = list[i]
    const key = f(value)
    obj[key] = value
  }

  return obj
})
