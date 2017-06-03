import { Just, Maybe, fromJust, isJust, just } from '../../maybe'

import { curry3 } from '../../function/curry'
import { isArrayLike } from '../isArrayLike'
import { ReduceArity3 } from './types'

export const reduce: ReduceArity3 = curry3(function reduce<A, B>(
  f: (acc: B, value: A, index: number) => B,
  seed: B,
  list: Array<A>
) {
  if (!isArrayLike(list))
    return isJust(list as Maybe<A>) ? just(f(seed, fromJust(list as Just<A>), 0)) : just(seed)

  const length = list.length
  let acc: B = seed

  for (let i = 0; i < length; ++i) acc = f(acc, list[i], i)

  return acc
})
