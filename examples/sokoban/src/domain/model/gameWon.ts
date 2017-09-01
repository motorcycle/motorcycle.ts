import { Boxes, Coordinate } from './types'
import { equals, reduce } from '167'

import { STORAGE } from './constants'
import { maze0 } from './mazes'

const maze = maze0

export function gameWon(boxes: Boxes): boolean {
  return reduce(onStorage, true, boxes)
}

function onStorage(acc: boolean, { x, y }: Coordinate): boolean {
  return equals(STORAGE, maze[y][x]) && acc
}
