import { curry2 } from '../../function/curry'
import { DropArity2 } from './types'

/**
 * Returns all but the first n elements of the given list or string.
 */
export const drop: DropArity2 = curry2(function<A>(n: number, list: Array<A>): any {
  // tslint:disable-next-line
  if (typeof list === 'string') return (list as string).slice(n)

  const length = list.length

  if (n >= length) return []

  const newList = Array(length - n)

  for (let i = n; i < length; ++i) newList[i - n] = list[i]

  return newList
})
