import { HeadArity1 } from './types'

/**
 * Returns the first element of the given list or string.
 * In some libraries this function is named first.
 */
export const head: HeadArity1 = function head<A>(list: Array<A>): A | void {
  // tslint:disable-next-line
  if (typeof list === 'string')
    return (list as any)[0] || ''

  return list[0] || void 0
} as HeadArity1
