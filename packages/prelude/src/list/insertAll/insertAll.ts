import { curry3 } from '../../function/curry'
import { InsertAllArity3 } from './types'

export const insertAll: InsertAllArity3 = curry3(
  // tslint:disable-next-line:cyclomatic-complexity
  function insertAll<A>(index: number, values: Array<A>, list: Array<A>): Array<A> {
    const length = list.length
    const valuesLength = values.length

    if (index < 0)
      return list

    if (length === 0)
      return values

    const newList = Array(length + valuesLength)

    let i = 0
    let j = 0

    for (; i < index; ++i)
      newList[i] = list[i]

    for (; j < valuesLength; ++j)
      newList[j + index] = values[j]

    i = i + j

    for (; i <= length + index; ++i)
      newList[i] = list[i - j]

    return newList
  }
)
