import { Coordinate, Direction, Maze, Player, PlayerDirection, Tile } from './types'
import { PLAYER_DOWN, PLAYER_LEFT, PLAYER_RIGHT, PLAYER_UP } from './constants'
import { add, equals, length, subtract } from '167'

const DEFAULT_PLAYER: Player = {
  position: { x: 0, y: 0 },
  direction: 'right',
}

export function player(maze: Maze): Player {
  for (let y = 0; y < length(maze); ++y)
    for (let x = 0; x < length(maze[y]); ++x) {
      const tile = maze[y][x]

      if (tileIsPlayerDirection(tile))
        return { position: adjustDirection(tile, { x, y }), direction: direction[tile] }
    }

  return DEFAULT_PLAYER
}

function tileIsPlayerDirection(tile: Tile): tile is PlayerDirection {
  return tile === PLAYER_UP || tile === PLAYER_RIGHT || tile === PLAYER_DOWN || tile === PLAYER_LEFT
}

function adjustDirection(player: PlayerDirection, coordinate: Coordinate): Coordinate {
  const { x, y } = coordinate

  if (equals(PLAYER_DOWN, player)) return { x, y: subtract(y, 1) }

  if (equals(PLAYER_LEFT, player)) return { x: add(x, 1), y }

  if (equals(PLAYER_RIGHT, player)) return { x: subtract(x, 1), y }

  return { x, y: add(y, 1) }
}

const direction: { [key in PlayerDirection]: Direction } = {
  '^': 'up',
  '>': 'right',
  v: 'down',
  '<': 'left',
}
