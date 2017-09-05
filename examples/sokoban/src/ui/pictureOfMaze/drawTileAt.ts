import { Coordinate, Direction, Tile } from '@base/application/types'
import { blank, player, sprites } from '../sprites'

import { VNode } from '@motorcycle/mostly-dom'
import { equals } from '167'

export function drawTileAt(
  coordinate: Coordinate,
  tile: Tile,
  playerPosition: Coordinate,
  playerDirection: Direction
): VNode {
  const { lat, long } = coordinate
  const key = `${lat}${long}`
  const playerOrBlank = equals(playerPosition, coordinate)
    ? player(playerDirection, key)
    : blank(key)

  return sprites[tile](playerOrBlank, key)
}
