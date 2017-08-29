import { ApplicationSinks, ApplicationSources, Boxes, Coordinate, Direction, State } from './types'
import { Maze, maze1 } from '@base/domain/model'
import { createProxy, sample, startWith } from '@motorcycle/stream'
import { equals, reduce } from '167'

import { movePlayer } from './movePlayer'

const START_PLAYER_COORDINATE: Coordinate = { x: 3, y: 3 }
const START_PLAYER_DIRECTION: Direction = 'right'

export function Application(sinks: ApplicationSinks): ApplicationSources {
  const { movePlayerInDirection$ } = sinks
  const { attach, stream: proxyState$ } = createProxy<State>()
  const maze = maze1
  const initialState: State = {
    playerPosition: START_PLAYER_COORDINATE,
    playerDirection: START_PLAYER_DIRECTION,
    boxes: initialBoxes(maze),
    maze,
  }
  const playerDirection$ = startWith(START_PLAYER_DIRECTION, movePlayerInDirection$)
  const newState$ = sample<Direction, State, State>(
    movePlayer,
    playerDirection$,
    startWith(initialState, proxyState$)
  )
  const state$ = attach(newState$)

  return { state$ }
}

function initialBoxes(maze: Maze): Boxes {
  return reduce(
    (accumulator, row, y) => [
      ...accumulator,
      ...reduce(
        (accumulator, tile, x) => (equals('B', tile) ? [...accumulator, { x, y }] : accumulator),
        [],
        row
      ),
    ],
    [],
    maze
  )
}
