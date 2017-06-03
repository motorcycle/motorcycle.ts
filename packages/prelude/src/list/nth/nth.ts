import { curry2 } from '../../function/curry'
import { NthArity2 } from './types'

export const nth: NthArity2 = curry2(function<A>(index: number, list: Array<A>): A | void {
  const length = list.length

  if (index < 0) index += length

  // tslint:disable
  if (typeof list === 'string') return (list as any)[index] || ''
  // tslint:enable

  return list[index]
})
