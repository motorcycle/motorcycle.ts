import { Matrix2D, NonnegativeInteger } from '@base/common/types'

export type Maze = Matrix2D<Tile>

export type Tile = Wall | Ground | Storage | Box | Blank

export type Wall = 'W'

export type Ground = 'G'

export type Storage = 'S'

export type Box = 'B'

export type Blank = '_'

export type State = {
  playerPosition: Coordinate
  playerDirection: Direction
  boxes: Boxes
  maze: Maze
}

export type Boxes = Coordinates

export type Coordinates = ReadonlyArray<Coordinate>

export type Coordinate = {
  x: NonnegativeInteger
  y: NonnegativeInteger
}

export type Direction = Up | Right | Down | Left

export type Up = 'up'

export type Right = 'right'

export type Down = 'down'

export type Left = 'left'
