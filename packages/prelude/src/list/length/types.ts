export interface LengthArity1 {
  (str: string): number
  (list: Array<any>): number
  (list: ArrayLike<any>): number
  (list: ReadonlyArray<any>): number
}
