import { Integer } from '@base/common/types'

export type Maze = Tiles

export type Tiles = ReadonlyArray<Tile>

export type Tile = Wall | Ground | Storage | Box

export type Wall = 'wall'

export type Ground = 'ground'

export type Storage = 'storage'

export type Box = 'box'

export type Direction = Up | Right | Down | Left

export type Up = 'up'

export type Right = 'right'

export type Down = 'down'

export type Left = 'left'

export type Coordinate = {
  x: Integer
  y: Integer
}
