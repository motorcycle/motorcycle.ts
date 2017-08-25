import { ApplicationSinks, ApplicationSources } from './'
import { Coordinate, Direction, canMoveTo, maze } from '@base/domain/model'
import { decrement, increment } from '167'
import { hold, map, startWith, tap } from '@motorcycle/stream'

import { buildMaze } from '@base/domain/services'
import { sample } from '@most/core'

const START_X_COORDINATE = 4
const START_Y_COORDINATE = 3
const START_COORDINATE: Coordinate = { x: START_X_COORDINATE, y: START_Y_COORDINATE }

export function Application(sinks: ApplicationSinks): ApplicationSources {
  const { direction$, fromCoordinate$ } = sinks
  const goTo$ = sample(makeGoToSpec, direction$, fromCoordinate$)
  const toCoordinate$ = tap(console.log, hold(startWith(START_COORDINATE, map(goTo, goTo$))))
  const maze$ = map(() => buildMaze(), toCoordinate$)

  return { maze$, toCoordinate$ }
}

const makeGoToSpec = (direction: Direction, from: Coordinate) => ({ from, direction })

function goTo(spec: { from: Coordinate; direction: Direction }): Coordinate {
  const { from, direction } = spec
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
