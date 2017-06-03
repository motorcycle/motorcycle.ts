import { PartialFn, PlaceHolder } from './types'

import { concat } from '../../list/concat'
import { filter } from '../../list/filter'
import { apply } from '../apply'
import { curry2 } from '../curry'
import { curryN } from '../curryN'

export const __: PlaceHolder = { '@@placeholder': true }

const isPlaceholder = (x: any): x is PlaceHolder => x['@@placeholder'] === true

export const partial: PartialFn = curry2((f: any, args: Array<any>): any => {
  const fnLength = f.length
  const argsLength = args.length

  if (fnLength === 0) return f
  if (argsLength === 0) return curryN(fnLength, f)

  const placeholderAmount = filter(isPlaceholder, args).length
  const length = Math.max(0, fnLength - argsLength) + placeholderAmount

  function partiallyApplied(...otherArgs: Array<any>) {
    if (placeholderAmount === 0) return apply(f, concat(args, otherArgs))

    const combinedArgs: Array<any> = Array(fnLength)

    for (let i = 0; i < combinedArgs.length; ++i)
      combinedArgs[i] = isPlaceholder(args[i]) ? otherArgs.shift() : args[i]

    return apply(f, concat(combinedArgs, otherArgs))
  }

  return curryN(length as 2, partiallyApplied)
})
