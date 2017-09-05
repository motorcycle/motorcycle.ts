import { Coordinate, Direction, Latitude, Longitude, Tile } from '@base/application/types'
import { curry, map } from '167'

import { Dimension } from '@base/common/types'
import { DrawRow } from './types'
import { VNodes } from '../views/types'
import { drawTileAt } from './drawTileAt'

export const drawRow: DrawRow = curry(function drawRow(
  playerPosition: Coordinate,
  playerDirection: Direction,
  row: Dimension<Tile>,
  long: Longitude
): VNodes {
  return map(
    (tile: Tile, lat: Latitude) => drawTileAt({ lat, long }, tile, playerPosition, playerDirection),
    row
  )
})
