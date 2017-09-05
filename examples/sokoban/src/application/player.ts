import { Direction, Maze, Player, PlayerDirection, Tile } from './types'
import { PLAYER_DOWN, PLAYER_LEFT, PLAYER_RIGHT, PLAYER_UP } from './constants'

import { length } from '167'

const DEFAULT_PLAYER: Player = {
  position: { lat: 0, long: 0 },
  direction: 'right',
}

export function player(maze: Maze): Player {
  for (let long = 0; long < length(maze); ++long)
    for (let lat = 0; lat < length(maze[long]); ++lat) {
      const tile = maze[long][lat]

      if (tileIsPlayerDirection(tile))
        return { position: { lat, long }, direction: direction[tile] }
    }

  return DEFAULT_PLAYER
}

function tileIsPlayerDirection(tile: Tile): tile is PlayerDirection {
  return tile === PLAYER_UP || tile === PLAYER_RIGHT || tile === PLAYER_DOWN || tile === PLAYER_LEFT
}

const direction: { [key in PlayerDirection]: Direction } = {
  '^': 'up',
  '>': 'right',
  v: 'down',
  '<': 'left',
}
