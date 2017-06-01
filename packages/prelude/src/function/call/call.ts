import { apply } from '../apply'
import { ArityN } from '../types'
import { CallFn } from './types'

export const call: CallFn =
  <R>(f: ArityN<R>, ...args: Array<any>) => apply<R>(f, args)
