import { Matrix2D, NonnegativeInteger } from '@base/common/types'

export type Maze = Matrix2D<Tile>

export type Tile = Wall | Ground | Storage | Box | Blank | Player

export type Wall = 'X'

export type Ground = ' '

export type Storage = 'O'

export type Box = 'B'

export type Blank = '_'

export type Player = PlayerUp | PlayerRight | PlayerDown | PlayerLeft

export type PlayerUp = '^'

export type PlayerRight = '>'

export type PlayerDown = 'v'

export type PlayerLeft = '<'

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
