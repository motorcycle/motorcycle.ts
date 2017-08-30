import {
  BLANK,
  BOX,
  GROUND,
  PLAYER_DOWN,
  PLAYER_LEFT,
  PLAYER_RIGHT,
  PLAYER_UP,
  STORAGE,
} from './constants'
import { Boxes, Coordinate, Direction, Maze, State, Tile } from './types'
import { curry, decrement, equals, find, increment, length, map } from '167'
import { maze1, playerCanMoveTo } from '@base/domain/model'

import { NonnegativeInteger } from '@base/common/types'

const maze = maze1

export const movePlayer: MovePlayer = curry(function movePlayer(
  direction: Direction,
  state: State
): State {
  const { playerPosition: from, boxes } = state
  const to = adjacentCoordinate[direction](from)
  const beyond = adjacentCoordinate[direction](to)
  const noPlayerMaze = mazeWithoutPlayer(maze)
  const noBoxMaze = mazeWithoutBoxes(noPlayerMaze)
  const currentMaze = mazeWithBoxes(noBoxMaze, boxes)
  const movedBoxes = map(moveBox(currentMaze, to, beyond), boxes)
  const movedBoxesMaze = mazeWithBoxes(noBoxMaze, movedBoxes)
  const playerPosition = playerCanMoveTo(movedBoxesMaze[to.y][to.x]) ? to : from

  return {
    playerPosition,
    playerDirection: direction,
    boxes: movedBoxes,
    maze: movedBoxesMaze,
  }
})

const adjacentCoordinate: { [key in Direction]: (from: Coordinate) => Coordinate } = {
  up: (from: Coordinate) => ({ x: from.x, y: decrement(from.y) }),
  right: (from: Coordinate) => ({ x: increment(from.x), y: from.y }),
  down: (from: Coordinate) => ({ x: from.x, y: increment(from.y) }),
  left: (from: Coordinate) => ({ x: decrement(from.x), y: from.y }),
}

function mazeWithoutPlayer(maze: Maze): Maze {
  return map(row => map(replacePlayer, row), maze)
}

function replacePlayer(tile: Tile): Tile {
  return equals(PLAYER_UP, tile) ||
  equals(PLAYER_RIGHT, tile) ||
  equals(PLAYER_DOWN, tile) ||
  equals(PLAYER_LEFT, tile)
    ? GROUND
    : tile
}

function mazeWithoutBoxes(maze: Maze): Maze {
  return map(row => map(replaceBox, row), maze)
}

function replaceBox(tile: Tile): Tile {
  return equals(BOX, tile) ? GROUND : tile
}

const mazeWithBoxes = curry(function mazeWithBoxes(maze: Maze, boxes: Boxes): Maze {
  return map((row, y) => map(addBox(boxes, y), row), maze)
})

const addBox = curry(function addBox(
  boxes: Boxes,
  y: NonnegativeInteger,
  tile: Tile,
  x: NonnegativeInteger
): Tile {
  return find(equals<Coordinate>({ x, y }), boxes) ? BOX : tile
})

const moveBox = curry(function moveBox(
  maze: Maze,
  to: Coordinate,
  beyond: Coordinate,
  box: Coordinate
) {
  const { x, y } = beyond
  const height = length(maze)
  const width = length(maze[0])
  const withinBounds = x >= 0 && x < width && (y >= 0 && y < height)
  const tile = withinBounds ? maze[y][x] : BLANK
  const newBox: Coordinate =
    equals(to, box) && (equals(GROUND, tile) || equals(STORAGE, tile)) ? beyond : box

  return newBox
})

export type MovePlayer = {
  (direction: Direction, state: State): State

  (direction: Direction): MovePlayerArity1
}

export type MovePlayerArity1 = {
  (state: State): State
}
