import { ascend, id, pipe } from '../../function/'

import { slice } from '../../list/slice'
import { sort } from '../../list/sort'
import { mean } from '../mean'

export function median(numbers: Array<number>): number
export function median(numbers: ArrayLike<number>): number
export function median(numbers: ReadonlyArray<number>): number

export function median(numbers: Array<number>): number {
  const length = numbers.length

  if (length === 0) return NaN

  const width = 2 - length / 2
  const index = (length - width) / 2

  return pipe(sort(ascend(id)), slice(index, index + width), mean)(numbers)
}
