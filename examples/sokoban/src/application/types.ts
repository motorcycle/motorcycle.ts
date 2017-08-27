import { Matrix2D, NonnegativeInteger } from '@base/common/types'

import { Stream } from '@motorcycle/types'

export type ApplicationSources = {
  maze$: Stream<Maze>
  movePlayerTo$: Stream<Coordinate>
  playerDirection$: Stream<Direction>
}

export type Maze = Matrix2D<Tile>

export type Tile = Wall | Ground | Storage | Box | Blank

export type Wall = 'W'

export type Ground = 'G'

export type Storage = 'S'

export type Box = 'B'

export type Blank = '_'

export type Coordinate = {
  x: NonnegativeInteger
  y: NonnegativeInteger
}

export type Direction = Up | Right | Down | Left

export type Up = 'up'

export type Right = 'right'

export type Down = 'down'

export type Left = 'left'

export type ApplicationSinks = {
  movePlayerInDirection$: Stream<Direction>
  movePlayerFrom$: Stream<Coordinate>
}
