import { BOX, GROUND } from './constants'
import { Maze, Tile } from './types'
import { equals, map } from '167'

export const mazeWithoutBoxes = (maze: Maze): Maze => map(row => map(replaceBox, row), maze)

const replaceBox = (tile: Tile): Tile => (equals(BOX, tile) ? GROUND : tile)
