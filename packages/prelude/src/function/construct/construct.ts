import { Curry10, Curry2, Curry3, Curry4, Curry5, Curry6, Curry7, Curry8, Curry9 } from '../types'

export interface ConstructFn {
  <R>(f: { new (): R }): () => R
  <A, R>(f: { new (a: A): R }): (a: A) => R
  <A, B, R>(f: { new (a: A, b: B): R }): Curry2<A, B, R>
  <A, B, C, R>(f: { new (a: A, b: B, c: C): R }): Curry3<A, B, C, R>
  <A, B, C, D, R>(f: { new (a: A, b: B, c: C, d: D): R }): Curry4<A, B, C, D, R>
  <A, B, C, D, E, R>(f: { new (a: A, b: B, c: C, d: D, e: E): R }): Curry5<A, B, C, D, E, R>
  <A, B, C, D, E, F, R>(f: { new (a: A, b: B, c: C, d: D, e: E, f: F): R }): Curry6<A, B, C, D, E, F, R>
  <A, B, C, D, E, F, G, R>(f: { new (a: A, b: B, c: C, d: D, e: E, f: F, g: G): R }): Curry7<A, B, C, D, E, F, G, R>
  <A, B, C, D, E, F, G, H, R>(f: { new (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H): R }): Curry8<A, B, C, D, E, F, G, H, R>
  <A, B, C, D, E, F, G, H, I, R>(f: { new (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I): R }): Curry9<A, B, C, D, E, F, G, H, I, R>
  // tslint:disable-next-line:max-line-length
  <A, B, C, D, E, F, G, H, I, J, R>(f: { new (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J): R }): Curry10<A, B, C, D, E, F, G, H, I, J, R>
}

export const construct: ConstructFn = function construct<A>(f: { new (...args: Array<any>): A }) {
  const length = f.length

  function curried(previousArgs: Array<any>) {
    return function (...args: Array<any>) {
      const concatArgs = previousArgs.concat(args)

      if (concatArgs.length >= length)
        return new f(...concatArgs)

      return curried(concatArgs)
    }
  }

  return curried([])
}
