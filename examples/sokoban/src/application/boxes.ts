import { Boxes, Coordinates, Latitude, Longitude, Maze, Tile, Tiles } from './types'
import { curry, equals, reduce } from '167'

import { BOX } from './constants'

export function boxes(maze: Maze): Boxes {
  return reduce(rowIterator, [], maze)
}

function rowIterator(acc: Coordinates, row: Tiles, long: Longitude): Boxes {
  return [...acc, ...reduce(boxIterator(long), [], row)]
}

const boxIterator = curry(function boxIterator(
  long: Longitude,
  acc: Coordinates,
  tile: Tile,
  lat: Latitude
): Coordinates {
  return equals(BOX, tile) ? [...acc, { lat, long }] : acc
})
