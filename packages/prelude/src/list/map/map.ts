import { Just, Maybe, Nothing, fromJust, isJust, just } from '../../maybe'

import { curry2 } from '../../function/curry'
import { isArrayLike } from '../isArrayLike'
import { MapArity2 } from './types'

export const map: MapArity2 = curry2(
  function map<A, B>(f: (a: A, index?: number) => B, list: Array<A>): any {
    if (!isArrayLike(list))
      return isJust<A>(list as Maybe<A>) ? just(f(fromJust(list as Just<A>))) : list as Nothing

    const length = list.length
    const newList = Array(length)

    for (let i = 0; i < length; ++i)
      newList[i] = f(list[i], i)

    return newList
  }
)
