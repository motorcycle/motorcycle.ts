// tslint:disable:max-line-length
export interface MergeAllArity1 {
  <
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
    H extends object,
    I extends object
  >(list: [A, B, C, D, E, F, G, H, I]): A & B & C & D & E & F & G & H & I
  <
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object,
    H extends object
  >(list: [A, B, C, D, E, F, G, H]): A & B & C & D & E & F & G & H
  <
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object,
    G extends object
  >(list: [A, B, C, D, E, F, G]): A & B & C & D & E & F & G
  <
    A extends object,
    B extends object,
    C extends object,
    D extends object,
    E extends object,
    F extends object
  >(list: [A, B, C, D, E, F]): A & B & C & D & E & F
  <A extends object, B extends object, C extends object, D extends object, E extends object>(list: [
    A,
    B,
    C,
    D,
    E
  ]): A & B & C & D & E
  <A extends object, B extends object, C extends object, D extends object>(list: [A, B, C, D]): A &
    B &
    C &
    D
  <A extends object, B extends object, C extends object>(list: [A, B, C]): A & B & C
  <A extends object, B extends object>(list: [A, B]): A & B
  <A extends object>(list: [A]): A

  (list: Array<any>): any
}
