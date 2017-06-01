import { curry2 } from '../../function/curry/curry2'

export const add: Add = curry2((a: number, b: number) => a + b)

export interface Add {
  (a: number, b: number): number

  (a: number): (b: number) => number
}
