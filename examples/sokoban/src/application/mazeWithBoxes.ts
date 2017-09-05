import { Boxes, Coordinate, Latitude, Longitude, Maze, MazeWithBoxes, Tile } from './types'
import { curry, equals, find, map } from '167'

import { BOX } from './constants'

export const mazeWithBoxes: MazeWithBoxes = curry(function mazeWithBoxes(
  maze: Maze,
  boxes: Boxes
): Maze {
  return map((row, y) => map(addBox(boxes, y), row), maze)
})

const addBox = curry(function addBox(
  boxes: Boxes,
  long: Longitude,
  tile: Tile,
  lat: Latitude
): Tile {
  return find(equals<Coordinate>({ lat, long }), boxes) ? BOX : tile
})
