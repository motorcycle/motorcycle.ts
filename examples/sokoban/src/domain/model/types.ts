import { Matrix2D, NonnegativeInteger } from '@base/common/types'

export type Mazes = ReadonlyArray<Maze>

export type Maze = Matrix2D<Tile>

export type Tiles = ReadonlyArray<Tile>

export type Tile = Wall | Ground | Storage | Box | Blank | PlayerDirection

export type Wall = 'X'

export type Ground = ' '

export type Storage = 'O'

export type Box = 'B'

export type Blank = '_'

export type Player = {
  position: Coordinate
  direction: Direction
}

export type PlayerDirection = PlayerUp | PlayerRight | PlayerDown | PlayerLeft

export type PlayerUp = '^'

export type PlayerRight = '>'

export type PlayerDown = 'v'

export type PlayerLeft = '<'

export type State = {
  readonly player: Player
  readonly boxes: Boxes
  readonly maze: Maze
  readonly moveCount: NonnegativeInteger
  readonly levelComplete: boolean
}

export type Boxes = Coordinates

export type Coordinates = ReadonlyArray<Coordinate>

// TODO: a 2D coordinate has longitude and latitude; not x and y as these are
// purely mathematical aliases.
export type Coordinate = {
  x: NonnegativeInteger
  y: NonnegativeInteger
}

export type Direction = Up | Right | Down | Left

export type Up = 'up'

export type Right = 'right'

export type Down = 'down'

export type Left = 'left'
