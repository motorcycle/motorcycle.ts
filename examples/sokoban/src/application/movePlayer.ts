import { Boxes, Coordinate, Direction, Maze, State } from './types'
import { curry, decrement, equals, find, increment, length, map } from '167'
import { maze1, playerCanMoveTo } from '@base/domain/model'

const maze = maze1

export const movePlayer: MovePlayer = curry(function movePlayer(
  direction: Direction,
  state: State
): State {
  const { playerPosition: from, boxes } = state
  const to = adjacentCoordinate[direction](from)
  const beyond = adjacentCoordinate[direction](to)
  const noBoxMaze = mazeWithoutBoxes(maze)
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

function mazeWithoutBoxes(maze: Maze): Maze {
  return map(row => map(tile => (equals('B', tile) ? 'G' : tile), row), maze)
}

const mazeWithBoxes = curry(function mazeWithBoxes(maze: Maze, boxes: Boxes): Maze {
  return map((row, y) => map((tile, x) => (find(equals({ x, y }), boxes) ? 'B' : tile), row), maze)
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
  const tile = withinBounds ? maze[y][x] : '_'
  const newBox: Coordinate =
    equals(to, box) && (equals('G', tile) || equals('S', tile)) ? beyond : box

  return newBox
})

export type MovePlayer = {
  (direction: Direction, state: State): State

  (direction: Direction): MovePlayerArity1
}

export type MovePlayerArity1 = {
  (state: State): State
}
