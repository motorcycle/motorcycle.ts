import { MergeAllArity1 } from './types'

export const mergeAll: MergeAllArity1 = function<A extends object>(list: Array<object>): A {
  const length = list.length
  const newObj: A = {} as A

  for (let i = 0; i < length; ++i) {
    const obj = list[i] as any
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) (newObj as any)[key] = obj[key]
    }
  }

  return newObj
}
