import { curry2 } from '../../function/curry/curry2'

export const multiply: Multiply = curry2((a: number, b: number) => a * b)

export interface Multiply {
  (a: number, b: number): number

  (a: number): (b: number) => number
}
