import { curry3 } from '../../function/curry/curry3'
import { clone } from '../clone'
import { AssocArity3 } from './types'

export const assoc: AssocArity3 = curry3(function assoc<A extends object, B>(
  path: string,
  value: B,
  obj: A
): A & { readonly [S in typeof path]: B } {
  const newObj = clone(obj) as A & { [S in typeof path]: B }

  newObj[path] = value

  return newObj
})
