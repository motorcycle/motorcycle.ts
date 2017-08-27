import { Coordinate, Direction, Maze } from '@base/application/types'

import { VNodes } from '../types'

export type PictureOfMazeArity3 = {
  (maze: Maze, playerPosition: Coordinate, playerDirection: Direction): VNodes

  (maze: Maze, playerPosition: Coordinate): PictureOfMazeArity1
  (maze: Maze): PictureOfMazeArity2
}

export type PictureOfMazeArity2 = {
  (playerPosition: Coordinate, playerDirection: Direction): VNodes

  (playerPosition: Coordinate): PictureOfMazeArity1
}

export type PictureOfMazeArity1 = {
  (playerDirection: Direction): VNodes
}
