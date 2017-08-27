import { ApplicationSinks, ApplicationSources } from './'
import { Coordinate, Direction } from './types'
import { decrement, increment } from '167'
import { maze1, playerCanMoveTo } from '@base/domain/model'
import { now, sample, startWith } from '@motorcycle/stream'

const START_PLAYER_COORDINATE: Coordinate = { x: 4, y: 3 }
const START_PLAYER_DIRECTION: Direction = 'right'

export function Application(sinks: ApplicationSinks): ApplicationSources {
  const { movePlayerInDirection$, movePlayerFrom$ } = sinks
  const maze$ = now(maze1)
  const playerDirection$ = startWith(START_PLAYER_DIRECTION, movePlayerInDirection$)
  const movePlayerTo$ = startWith(
    START_PLAYER_COORDINATE,
    sample(movePlayer, playerDirection$, movePlayerFrom$)
  )

  return { maze$, movePlayerTo$, playerDirection$ }
}

function movePlayer(direction: Direction, from: Coordinate): Coordinate {
  const to = adjacentCoordinate[direction](from)

  if (playerCanMoveTo(maze1[to.y][to.x])) return to

  return from
}

const adjacentCoordinate: { [key in Direction]: (from: Coordinate) => Coordinate } = {
  up: (from: Coordinate) => ({ x: from.x, y: decrement(from.y) }),
  right: (from: Coordinate) => ({ x: increment(from.x), y: from.y }),
  down: (from: Coordinate) => ({ x: from.x, y: increment(from.y) }),
  left: (from: Coordinate) => ({ x: decrement(from.x), y: from.y }),
}
