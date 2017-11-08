import { length, map } from '@typed/list'

import { Stream } from '@motorcycle/types'
import { combineArray } from './combineArray'

/**
 * Takes an object of streams and returns a Stream of an object.
 *
 * @name combineObj<Obj extends object>(obj: { [K in keyof Obj]: Stream<Obj[K]> }): Stream<Obj>
 * @example
 * import { combineObj, now } from '@motorcycle/stream'
 *
 * const obj = { a: now(1), b: now(2), c: now(3) }
 *
 * const stream: Stream<{ a: number, b: number, c: number }> = combineObj(obj)
 */
export function combineObj<Obj extends object>(
  object: { readonly [K in keyof Obj]: Stream<Obj[K]> }
): Stream<Obj> {
  const objectKeys = Object.keys(object) as Array<keyof Obj>
  const sources = map(key => object[key], objectKeys)

  return combineArray((...values: Array<Obj[keyof Obj]>) => {
    const valuesMap = {} as Obj

    for (let i = 0; i < length(values); ++i) valuesMap[objectKeys[i]] = values[i]

    return valuesMap
  }, sources)
}
