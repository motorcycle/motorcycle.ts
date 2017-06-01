import { reduce } from '../../list/reduce'

import { multiply } from '../multiply'

export const product: Product = reduce<number, number>(multiply, 1)

export interface Product {
  (numbers: Array<number>): number
  (numbers: ArrayLike<number>): number
  (numbers: ReadonlyArray<number>): number
}
