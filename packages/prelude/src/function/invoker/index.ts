import { bind } from '../bind'
import { curry3 } from '../curry'
import { curryN } from '../curryN'
import { InvokerFn } from './types'

export const invoker: InvokerFn = (curry3(<O>(arity: number, method: keyof O, obj: O) =>
  curryN(arity as any, bind((obj as any)[method], obj))
) as any) as InvokerFn
