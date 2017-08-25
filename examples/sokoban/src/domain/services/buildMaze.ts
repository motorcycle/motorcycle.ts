import { Maze, Tile, Tiles, maze } from '../model'
import { append, concat, equals, increment } from '167'

import { Integer } from '@base/common/types'

const MAX_ROW = 9
const MIN_ROW = 0
const MAX_COLUMN = 9

export function buildMaze(): Maze {
  return buildRows(0)
}

function buildRows(row: Integer, tiles: Tiles = []): Tiles {
  if (equals(MAX_ROW, row)) return tiles

  const newTiles: Tiles = concat(tiles, buildColumns(row, MIN_ROW))

  return buildRows(increment(row), newTiles)
}

function buildColumns(row: Integer, column: Integer, tiles: Tiles = []): Tiles {
  if (equals(MAX_COLUMN, column)) return tiles

  const tile: Tile = maze(column, row)
  const newTiles: Tiles = append(tile, tiles)

  return buildColumns(row, increment(column), newTiles)
}
