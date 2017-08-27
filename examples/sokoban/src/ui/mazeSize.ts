import { Maze } from '@base/application/types'
import { MazeSize } from './types'
import { TILE_SIZE } from './constants'
import { length } from '167'

export function mazeSize(maze: Maze): MazeSize {
  const height = length(maze[0]) * TILE_SIZE
  const width = length(maze) * TILE_SIZE

  return { height, width }
}
