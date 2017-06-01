export interface And {
  (a: true, b: true): true,
  (a: false, b: false): false,
  (a: false, b: true): false,
  (a: true, b: false): false,

  (a: true): AndT
  (a: false): AndF
}

export interface AndT {
  (b: true): true,
  (b: false): false,
}

export interface AndF {
  (b: true): false,
  (b: false): false
}
