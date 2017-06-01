import { LastArity1 } from './types'

export const last: LastArity1 = function <A> (list: Array<A>) {
  const length = list.length

  // tslint:disable-next-line
  if (typeof list === 'string')
    return (list as string)[length - 1] || ''

  return list[length - 1]
} as LastArity1
