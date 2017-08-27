import { Matrix2D } from '@base/common/types'

export type Maze = Matrix2D<Tile>

export type Tile = Wall | Ground | Storage | Box | Blank

export type Wall = 'W'

export type Ground = 'G'

export type Storage = 'S'

export type Box = 'B'

export type Blank = '_'
