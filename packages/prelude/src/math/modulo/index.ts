import { curry2 } from '../../function/curry/curry2'

export const modulo: Modulo = curry2((a: number, b: number) => a % b)

export interface Modulo {
  (a: number, b: number): number

  (a: number): (b: number) => number
}
