import {
  ApplicationSinks,
  ApplicationSources,
  Boxes,
  Direction,
  Player,
  State,
  Tile,
} from './types'
import { BOX, PLAYER_DOWN, PLAYER_LEFT, PLAYER_RIGHT, PLAYER_UP } from './constants'
import { Maze, maze1 } from '@base/domain/model'
import { createProxy, sample, startWith } from '@motorcycle/stream'
import { equals, reduce } from '167'

import { NonnegativeInteger } from '@base/common/types'
import { movePlayer } from './movePlayer'

export function Application(sinks: ApplicationSinks): ApplicationSources {
  const { movePlayerInDirection$ } = sinks
  const { attach, stream: proxyState$ } = createProxy<State>()
  const maze = maze1
  const { playerPosition, playerDirection } = player(maze)
  const initialState: State = {
    playerPosition,
    playerDirection,
    boxes: initialBoxes(maze),
    maze,
  }
  const playerDirection$ = startWith(playerDirection, movePlayerInDirection$)
  const newState$ = sample<Direction, State, State>(
    movePlayer,
    playerDirection$,
    startWith(initialState, proxyState$)
  )
  const state$ = attach(newState$)

  return { state$ }
}

function player(maze: Maze) {
  return reduce(
    (accumulator, row, y) => [
      ...accumulator,
      ...reduce(
        (accumulator, tile, x) =>
          isPlayerTile(tile)
            ? [
                ...accumulator,
                {
                  playerPosition: adjustDirection(tile, x, y),
                  playerDirection: playerDirection[tile],
                },
              ]
            : accumulator,
        [],
        row
      ),
    ],
    [],
    maze
  )[0]
}

const playerDirection: { [key in Player]: Direction } = {
  '^': 'up',
  '>': 'right',
  v: 'down',
  '<': 'left',
}

function isPlayerTile(tile: Tile): tile is Player {
  return tile === PLAYER_UP || tile === PLAYER_RIGHT || tile === PLAYER_DOWN || tile === PLAYER_LEFT
}

function adjustDirection(tile: Tile, x: NonnegativeInteger, y: NonnegativeInteger) {
  if (tile === PLAYER_RIGHT) return { x: x - 1, y }

  if (tile === PLAYER_LEFT) return { x: x + 1, y }

  if (tile === PLAYER_DOWN) return { x, y: y - 1 }

  return { x, y: y + 1 }
}

function initialBoxes(maze: Maze): Boxes {
  return reduce(
    (accumulator, row, y) => [
      ...accumulator,
      ...reduce(
        (accumulator, tile, x) => (equals(BOX, tile) ? [...accumulator, { x, y }] : accumulator),
        [],
        row
      ),
    ],
    [],
    maze
  )
}
