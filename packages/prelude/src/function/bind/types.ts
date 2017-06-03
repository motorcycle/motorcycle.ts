import {
  Arity0,
  Arity1,
  Arity1Bound,
  Arity2,
  Arity2Bound,
  Arity3,
  Arity3Bound,
  Arity4,
  Arity4Bound,
  Arity5,
  Arity5Bound,
} from '../types'

export interface BindArity2 {
  <A, that>(f: Arity0<A>, obj: that): (this: that) => A
  <A, B, that>(f: Arity1<A, B>, obj: that): Arity1Bound<that, A, B>
  <A, B, C, that>(f: Arity2<A, B, C>, obj: that): Arity2Bound<that, A, B, C>
  <A, B, C, D, that>(f: Arity3<A, B, C, D>, obj: that): Arity3Bound<that, A, B, C, D>
  <A, B, C, D, E, that>(f: Arity4<A, B, C, D, E>, obj: that): Arity4Bound<that, A, B, C, D, E>
  <A, B, C, D, E, F, that>(f: Arity5<A, B, C, D, E, F>, obj: that): Arity5Bound<
    that,
    A,
    B,
    C,
    D,
    E,
    F
  >

  <A, B>(f: Arity1<A, B>): <that>(obj: that) => Arity1Bound<that, A, B>
  <A, B, C>(f: Arity2<A, B, C>): <that>(obj: that) => Arity2Bound<that, A, B, C>
  <A, B, C, D>(f: Arity3<A, B, C, D>): <that>(obj: that) => Arity3Bound<that, A, B, C, D>
  <A, B, C, D, E>(f: Arity4<A, B, C, D, E>): <that>(obj: that) => Arity4Bound<that, A, B, C, D, E>
  <A, B, C, D, E, F>(f: Arity5<A, B, C, D, E, F>): <that>(
    obj: that
  ) => Arity5Bound<that, A, B, C, D, E, F>

  <that>(f: (...args: Array<any>) => any, obj: that): (this: that, ...args: Array<any>) => any
  (f: (...args: Array<any>) => any): <that>(obj: that) => (this: that, ...args: Array<any>) => any
}
