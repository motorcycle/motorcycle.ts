import { Complement } from './types'

export const complement: Complement =
  <F extends Function>(f: F) => (...args: Array<any>) => !f.apply(null, args)
