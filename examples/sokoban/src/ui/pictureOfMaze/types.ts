import { Coordinate, Direction, Longitude, Tile } from '@base/application/types'

import { Dimension } from '@base/common/types'
import { VNodes } from '../views/types'

export type DrawRow = {
  (
    playerPosition: Coordinate,
    playerDirection: Direction,
    row: Dimension<Tile>,
    long: Longitude
  ): VNodes
  (playerPosition: Coordinate, playerDirection: Direction, row: Dimension<Tile>): DrawRowArity1
  (playerPosition: Coordinate, playerDirection: Direction): DrawRowArity2
  (playerPosition: Coordinate): DrawRowArity3
}

export type DrawRowArity1 = {
  (long: Longitude): VNodes
}

export type DrawRowArity2 = {
  (row: Dimension<Tile>, long: Longitude): VNodes
  (row: Dimension<Tile>): DrawRowArity1
}

export type DrawRowArity3 = {
  (playerDirection: Direction, row: Dimension<Tile>, long: Longitude): VNodes
  (playerDirection: Direction, row: Dimension<Tile>): DrawRowArity1
  (playerDirection: Direction): DrawRowArity2
}
