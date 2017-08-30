import { Boxes, Coordinates, Maze, Tile, Tiles } from './types'
import { curry, equals, reduce } from '167'

import { BOX } from './constants'
import { NonnegativeInteger } from '@base/common/types'

export function boxes(maze: Maze): Boxes {
  return reduce(rowIterator, [], maze)
}

function rowIterator(acc: Coordinates, row: Tiles, y: NonnegativeInteger): Boxes {
  return [...acc, ...reduce(boxIterator(y), [], row)]
}

const boxIterator = curry(function boxIterator(
  y: NonnegativeInteger,
  acc: Coordinates,
  tile: Tile,
  x: NonnegativeInteger
): Coordinates {
  return equals(BOX, tile) ? [...acc, { x, y }] : acc
})
