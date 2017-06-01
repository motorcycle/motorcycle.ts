export function once<F extends Function>(f: F): F {
  let result: any
  let called = false

  return function (...args: Array<any>) {
    if (called) return result

    called = true

    // tslint:disable-next-line
    return result = f.apply(this, args)
  } as any as F
}
