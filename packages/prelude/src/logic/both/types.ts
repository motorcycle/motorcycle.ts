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
} from '../../function/types'

export interface BothArity2 {
  <A>(f: Arity1<A, boolean>, g: typeof f): typeof f
  <A, B>(f: Arity2<A, B, boolean>, g: typeof f): typeof f
  <A, B, C>(f: Arity3<A, B, C, boolean>, g: typeof f): typeof f
  <A, B, C, D>(f: Arity4<A, B, C, D, boolean>, g: typeof f): typeof f
  <A, B, C, D, E>(f: Arity5<A, B, C, D, E, boolean>, g: typeof f): typeof f
  <A, B, C, D, E, F>(f: Arity6<A, B, C, D, E, F, boolean>, g: typeof f): typeof f
  <A, B, C, D, E, F, G>(f: Arity7<A, B, C, D, E, F, G, boolean>, g: typeof f): typeof f
  <A, B, C, D, E, F, G, H>(f: Arity8<A, B, C, D, E, F, G, H, boolean>, g: typeof f): typeof f
  <A, B, C, D, E, F, G, H, I>(f: Arity9<A, B, C, D, E, F, G, H, I, boolean>, g: typeof f): typeof f
  <A, B, C, D, E, F, G, H, I, J>(f: Arity10<
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    boolean
  >, g: typeof f): typeof f

  <A>(f: Arity1<A, boolean>): BothArity1<typeof f>
  <A, B>(f: Arity2<A, B, boolean>): BothArity1<typeof f>
  <A, B, C>(f: Arity3<A, B, C, boolean>): BothArity1<typeof f>
  <A, B, C, D>(f: Arity4<A, B, C, D, boolean>): BothArity1<typeof f>
  <A, B, C, D, E>(f: Arity5<A, B, C, D, E, boolean>): BothArity1<typeof f>
  <A, B, C, D, E, F>(f: Arity6<A, B, C, D, E, F, boolean>): BothArity1<typeof f>
  <A, B, C, D, E, F, G>(f: Arity7<A, B, C, D, E, F, G, boolean>): BothArity1<typeof f>
  <A, B, C, D, E, F, G, H>(f: Arity8<A, B, C, D, E, F, G, H, boolean>): BothArity1<typeof f>
  <A, B, C, D, E, F, G, H, I>(f: Arity9<A, B, C, D, E, F, G, H, I, boolean>): BothArity1<typeof f>
  <A, B, C, D, E, F, G, H, I, J>(f: Arity10<A, B, C, D, E, F, G, H, I, J, boolean>): BothArity1<
    typeof f
  >
}

export type BothArity1<F extends Function> = (g: F) => F
