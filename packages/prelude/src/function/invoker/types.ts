import { Curry10, Curry2, Curry3, Curry4, Curry5, Curry6, Curry7, Curry8, Curry9 } from '../types'

export interface InvokerFn {
  <O>(arity: 0, method: keyof O, obj: O): O[typeof method]
  <A, B, O>(arity: 1, method: keyof O, obj: O): O[typeof method]
  <A, B, C, O>(arity: 2, method: keyof O, obj: O): Curry2<A, B, C>
  <A, B, C, D, O>(arity: 3, method: keyof O, obj: O): Curry3<A, B, C, D>
  <A, B, C, D, E, O>(arity: 4, method: keyof O, obj: O): Curry4<A, B, C, D, E>
  <A, B, C, D, E, F, O>(arity: 5, method: keyof O, obj: O): Curry5<A, B, C, D, E, F>
  <A, B, C, D, E, F, G, O>(arity: 6, method: keyof O, obj: O): Curry6<A, B, C, D, E, F, G>
  <A, B, C, D, E, F, G, H, O>(arity: 7, method: keyof O, obj: O): Curry7<A, B, C, D, E, F, G, H>
  <A, B, C, D, E, F, G, H, I, O>(arity: 8, method: keyof O, obj: O): Curry8<A, B, C, D, E, F, G, H, I>
  <A, B, C, D, E, F, G, H, I, J, O>(arity: 9, method: keyof O, obj: O): Curry9<A, B, C, D, E, F, G, H, I, J>
  <A, B, C, D, E, F, G, H, I, J, K, O>(arity: 10, method: keyof O, obj: O): Curry10<A, B, C, D, E, F, G, H, I, J, K>
}
