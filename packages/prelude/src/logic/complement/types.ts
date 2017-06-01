import { Arity0, Arity1, Arity10, Arity2, Arity3, Arity4, Arity5, Arity6, Arity7, Arity8, Arity9 } from '../../function/types'

export interface Complement {
  <A>(f: Arity0<A>): Arity0<boolean>
  <A, B>(f: Arity1<A, B>): Arity1<A, boolean>
  <A, B, C>(f: Arity2<A, B, C>): Arity2<A, B, boolean>
  <A, B, C, D>(f: Arity3<A, B, C, D>): Arity3<A, B, C, boolean>
  <A, B, C, D, E>(f: Arity4<A, B, C, D, E>): Arity4<A, B, C, D, boolean>
  <A, B, C, D, E, F>(f: Arity5<A, B, C, D, E, F>): Arity5<A, B, C, D, E, boolean>
  <A, B, C, D, E, F, G>(f: Arity6<A, B, C, D, E, F, G>): Arity6<A, B, C, D, E, F, boolean>
  <A, B, C, D, E, F, G, H>(f: Arity7<A, B, C, D, E, F, G, H>): Arity7<A, B, C, D, E, F, G, boolean>
  <A, B, C, D, E, F, G, H, I>(f: Arity8<A, B, C, D, E, F, G, H, I>): Arity8<A, B, C, D, E, F, G, H, boolean>
  <A, B, C, D, E, F, G, H, I, J>(f: Arity9<A, B, C, D, E, F, G, H, I, J>): Arity9<A, B, C, D, E, F, G, H, I, boolean>
  <A, B, C, D, E, F, G, H, I, J, K>(f: Arity10<A, B, C, D, E, F, G, H, I, J, K>): Arity10<A, B, C, D, E, F, G, H, I, J, boolean>
}
