import { GROUND, PLAYER_DOWN, PLAYER_LEFT, PLAYER_RIGHT, PLAYER_UP } from './constants'
import { Maze, Tile } from './types'
import { equals, map, or } from '167'

export const mazeWithoutPlayer = (maze: Maze): Maze => map(row => map(replacePlayer, row), maze)

function replacePlayer(tile: Tile): Tile {
  const isPlayerUp = equals(PLAYER_UP, tile)
  const isPlayerRight = equals(PLAYER_RIGHT, tile)
  const isPlayerDown = equals(PLAYER_DOWN, tile)
  const isPlayerLeft = equals(PLAYER_LEFT, tile)

  return or(or(or(isPlayerUp, isPlayerRight), isPlayerDown), isPlayerLeft) ? GROUND : tile
}
