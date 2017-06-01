import { map } from '../../list/map'
import { keys } from '../keys'

export const values = <A extends object>(obj: A): ReadonlyArray<A[keyof A]> =>
  map((key) => obj[key], keys(obj))
