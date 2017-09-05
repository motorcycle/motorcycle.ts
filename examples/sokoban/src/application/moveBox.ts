import { Coordinate, Maze, MoveBox } from './types'
import { curry, equals, length } from '167'

import { BLANK } from './constants'
import { tryMove } from '@base/domain/model'

export const moveBox: MoveBox = curry(function moveBox(
  maze: Maze,
  to: Coordinate,
  beyond: Coordinate,
  box: Coordinate
): Coordinate {
  const { lat, long } = beyond
  const mazeLength = length(maze)
  const mazeWidth = length(maze[0])
  const withinBounds = lat >= 0 && lat < mazeWidth && (long >= 0 && long < mazeLength)
  const tile = withinBounds ? maze[long][lat] : BLANK

  return equals(to, box) && tryMove(tile) ? beyond : box
})
