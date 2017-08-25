import { Coordinate, Direction, Maze } from '@base/domain/model'

import { Stream } from '@motorcycle/types'

export type ApplicationSources = {
  maze$: Stream<Maze>
  toCoordinate$: Stream<Coordinate>
}

export type ApplicationSinks = {
  direction$: Stream<Direction>
  fromCoordinate$: Stream<Coordinate>
}
