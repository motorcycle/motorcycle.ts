import { Boxes, Coordinate, Maze } from './types'
import { equals, reduce } from '167'

import { STORAGE } from './constants'

export function levelComplete(maze: Maze, boxes: Boxes): boolean {
  return reduce(onStorage(maze), true, boxes)
}

function onStorage(maze: Maze): (acc: boolean, coordinate: Coordinate) => boolean {
  return function(acc: boolean, { x, y }: Coordinate): boolean {
    return equals(STORAGE, maze[y][x]) && acc
  }
}
