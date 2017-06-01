import { curry2 } from '../../function/curry'
import { DropLastArity2 } from './types'

/**
 * Returns a list containing all but the last n elements of the given list.
 */
export const dropLast: DropLastArity2 = curry2(
  function <A> (n: number, list: Array<A>): any {
    // tslint:disable-next-line
    if (typeof list === 'string')
      return (list as string).slice(0, (list as string).length - n)

    const length = list.length

    if (n >= length) return []

    const newList = Array(length - n)

    for (let i = 0; i < length - n; ++i)
    {
      newList[i] = list[i]
    }

    return newList
  }
)
