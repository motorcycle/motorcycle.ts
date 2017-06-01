import { curry2 } from '../../function/curry'
import { PartitionArity2 } from './types'

export const partition: PartitionArity2 = curry2(
  function partition<A>(predicate: (a: A) => boolean, list: Array<A>): [ Array<A>, Array<A> ] {
    const length = list.length
    const left: Array<A> = []
    const right: Array<A> = []
    const newList: [ Array<A>, Array<A> ] = [ left, right ]

    for (let i = 0; i < length; ++i)
    {
      if (predicate(list[i]))
        left.push(list[i])
      else
        right.push(list[i])
    }

    return newList
  }
)
