import { Coordinate, Direction, Maze } from '@base/domain/model'

import { Stream } from '@motorcycle/types'

export type ApplicationSources = {
  maze$: Stream<Maze>
  movePlayerTo$: Stream<Coordinate>
  playerDirection$: Stream<Direction>
}

export type ApplicationSinks = {
  movePlayerInDirection$: Stream<Direction>
  movePlayerFrom$: Stream<Coordinate>
  reset$: Stream<true>
}
