import { sum } from '../sum'

export function mean(numbers: Array<number>): number
export function mean(numbers: ArrayLike<number>): number
export function mean(numbers: ReadonlyArray<number>): number

export function mean(numbers: Array<number>): number {
  return sum(numbers) / numbers.length
}
