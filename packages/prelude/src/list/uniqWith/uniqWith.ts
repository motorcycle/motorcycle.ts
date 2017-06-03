import { curry2 } from '../../function/curry'
import { UniqWithArity2 } from './types'

export const uniqWith: UniqWithArity2 = curry2(function uniqWith<A>(
  comparator: (a: A, b: A) => boolean,
  list: Array<A>
) {
  const length = list.length
  const result = []

  for (let i = 0; i < length; ++i) {
    const item = list[i]

    if (!containsWith(comparator, item, result)) result.push(item)
  }

  return result
})

function containsWith<A>(comparator: (a: A, b: A) => boolean, item: A, list: Array<A>): boolean {
  const length = list.length

  for (let i = 0; i < length; ++i) if (comparator(item, list[i])) return true

  return false
}
