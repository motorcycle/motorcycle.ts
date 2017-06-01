import { curry2 } from '../../function/curry/curry2'

export const subtract: Subtract = curry2((a: number, b: number) => a - b)

export interface Subtract {
  (a: number, b: number): number

  (a: number): (b: number) => number
}
