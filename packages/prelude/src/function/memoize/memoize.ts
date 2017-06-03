import { reduce } from '../../list/reduce'
import { apply } from '../apply'

export function memoize<F extends Function>(f: F): F {
  const cache = new Map<any, any>()

  return (function memoized(...args: Array<any>) {
    const key = reduce((prev, curr) => prev + JSON.stringify(curr), '', args)

    let result = cache.get(key)

    if (result) return result

    result = apply(f as any, args)

    if (typeof result === 'function') result = memoize(result)

    cache.set(key, result)

    return result
  } as any) as F
}
