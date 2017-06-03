import { curry2 } from '../../function/curry'
import { UniqByArity2 } from './types'

export const uniqBy: UniqByArity2 = curry2(function uniqBy<A, B>(
  f: (a: A) => B,
  list: Array<A>
): ReadonlyArray<A> {
  const length = list.length
  const set = new Set<B>()
  const newList: Array<A> = []
  let setSize = 0

  for (let i = 0; i < length; ++i) {
    const item = list[i]
    const appliedItem = f(item)
    if (set.add(appliedItem).size > setSize) {
      setSize++
      newList.push(item)
    }
  }

  return newList
})
