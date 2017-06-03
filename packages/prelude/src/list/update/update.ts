import { curry3 } from '../../function/curry'
import { UpdateArity3 } from './types'

export const update: UpdateArity3 = curry3(
  // tslint:disable-next-line:cyclomatic-complexity
  function update<A>(index: number, value: A, list: Array<A>): ReadonlyArray<A> {
    const length = list.length

    if (length === 0 || index < 0 || index >= length) return list

    const newList = Array(length)

    for (let i = 0; i < length; ++i) newList[i] = i === index ? value : list[i]

    return newList
  }
)
