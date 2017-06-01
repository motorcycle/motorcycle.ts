import { curry2 } from '../../function/curry/curry2'

export const divide: Divide = curry2((a: number, b: number) => a / b)

export interface Divide {
  (a: number, b: number): number

  (a: number): (b: number) => number
}
