import { curry2, map as mapArray } from '167'

import { Stream } from '@motorcycle/types'
import { map } from './map'

export const mapList: MapList = curry2(__mapList)

export type MapList = {
  <A, B>(f: (value: A, index: number) => B, list$: Stream<ArrayLike<A>>): Stream<ReadonlyArray<B>>
  <A, B>(f: (value: A, index: number) => B): (
    list$: Stream<ArrayLike<A>>
  ) => Stream<ReadonlyArray<B>>
}

function __mapList<A, B>(
  f: (value: A) => B,
  list$: Stream<ArrayLike<A>>
): Stream<ReadonlyArray<B>> {
  return map<ArrayLike<A>, ReadonlyArray<B>>(mapArray(f), list$)
}
