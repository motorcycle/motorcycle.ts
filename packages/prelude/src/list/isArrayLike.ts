// tslint:disable-next-line:cyclomatic-complexity
export function isArrayLike(x: any): x is ArrayLike<any> {
  if (Array.isArray(x)) return true

  if (!x || typeof x !== 'object' || typeof x === 'string') return false

  if (x.nodeType === 1) return !!x.length

  if (x.length === 0) return true

  if (x.length > 0) return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1)

  return false
}
