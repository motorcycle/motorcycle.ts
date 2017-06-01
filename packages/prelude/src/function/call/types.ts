import {
  Arity1,
  Arity10,
  Arity2,
  Arity3,
  Arity4,
  Arity5,
  Arity6,
  Arity7,
  Arity8,
  Arity9,
} from '../types'

export interface CallFn {
  <A, B>(f: Arity1<A, B>, a: A): B
  <A, B, C>(f: Arity2<A, B, C>, a: A, b: B): C
  <A, B, C, D>(f: Arity3<A, B, C, D>, a: A, b: B, c: C): D
  <A, B, C, D, E>(f: Arity4<A, B, C, D, E>, a: A, b: B, c: C, d: D): E
  <A, B, C, D, E, F>(f: Arity5<A, B, C, D, E, F>, a: A, b: B, c: C, d: D, e: E): F
  <A, B, C, D, E, F, G>(fn: Arity6<A, B, C, D, E, F, G>, a: A, b: B, c: C, d: D, e: E, f: F): G
  <A, B, C, D, E, F, G, H>(fn: Arity7<A, B, C, D, E, F, G, H>, a: A, b: B, c: C, d: D, e: E, f: F, g: G): H
  <A, B, C, D, E, F, G, H, I>(fn: Arity8<A, B, C, D, E, F, G, H, I>, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H): I
  <A, B, C, D, E, F, G, H, I, J>(fn: Arity9<A, B, C, D, E, F, G, H, I, J>, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I): J
  <A, B, C, D, E, F, G, H, I, J, K>(fn: Arity10<A, B, C, D, E, F, G, H, I, J, K>, a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J): K
}
