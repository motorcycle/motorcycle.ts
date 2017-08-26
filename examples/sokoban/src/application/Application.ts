import { ApplicationSinks, ApplicationSources } from './'
import { Coordinate, Direction, canMoveTo, maze } from '@base/domain/model'
import { constant, map, merge, sample, startWith } from '@motorcycle/stream'
import { decrement, increment } from '167'

import { buildMaze } from '@base/domain/services'

const START_X_COORDINATE = 4
const START_Y_COORDINATE = 3
const START_COORDINATE: Coordinate = { x: START_X_COORDINATE, y: START_Y_COORDINATE }
const START_DIRECTION: Direction = 'right'

export function Application(sinks: ApplicationSinks): ApplicationSources {
  const { movePlayerInDirection$, movePlayerFrom$, reset$ } = sinks
  const direction$ = startWith(START_DIRECTION, movePlayerInDirection$)
  const movePlayerTo$ = merge(
    constant(START_COORDINATE, reset$),
    startWith(START_COORDINATE, sample(goTo, direction$, movePlayerFrom$))
  )
  const maze$ = map(() => buildMaze(), movePlayerTo$)
  const playerDirection$ = merge(constant(START_DIRECTION, reset$), direction$)

  return { maze$, movePlayerTo$, playerDirection$ }
}

function goTo(direction: Direction, from: Coordinate): Coordinate {
  const to = adjacentCoordinate[direction](from)

  if (canMoveTo(maze(to.x, to.y))) return to

  return from
}

const adjacentCoordinate: { [key in Direction]: (from: Coordinate) => Coordinate } = {
  up: (from: Coordinate) => ({ x: from.x, y: decrement(from.y) }),
  right: (from: Coordinate) => ({ x: increment(from.x), y: from.y }),
  down: (from: Coordinate) => ({ x: from.x, y: increment(from.y) }),
  left: (from: Coordinate) => ({ x: decrement(from.x), y: from.y }),
}
