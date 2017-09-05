import { Boxes, Coordinate, Maze } from './types'
import { equals, reduce } from '167'

import { STORAGE } from './constants'

export function isLevelCompleted(maze: Maze, boxes: Boxes): boolean {
  return reduce(onStorage(maze), true, boxes)
}

function onStorage(maze: Maze): (acc: boolean, coordinate: Coordinate) => boolean {
  return function(acc: boolean, { lat, long }: Coordinate): boolean {
    return equals(STORAGE, maze[long][lat]) && acc
  }
}
