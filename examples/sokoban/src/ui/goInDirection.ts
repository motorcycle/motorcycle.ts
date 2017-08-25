import { Direction } from '@base/application/types'

export const goInDirection = (direction: Direction, shouldMove: boolean) =>
  shouldMove ? direction : false
