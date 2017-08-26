import { ApplicationSinks, ApplicationSources } from './'
import { Coordinate, Direction, canMoveTo, maze } from '@base/domain/model'
import { decrement, increment } from '167'
import { hold, map, sample, startWith, tap } from '@motorcycle/stream'

import { buildMaze } from '@base/domain/services'

const START_X_COORDINATE = 4
const START_Y_COORDINATE = 3
const START_COORDINATE: Coordinate = { x: START_X_COORDINATE, y: START_Y_COORDINATE }
const START_DIRECTION: Direction = 'right'

export function Application(sinks: ApplicationSinks): ApplicationSources {
  const { direction$, movePlayerFrom$ } = sinks
  const playerDirection$ = hold(startWith(START_DIRECTION, direction$))
  const movePlayerTo$ = hold(
    startWith(START_COORDINATE, sample(goTo, tap(console.log, playerDirection$), movePlayerFrom$))
  )
  const maze$ = map(() => buildMaze(), movePlayerTo$)

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
