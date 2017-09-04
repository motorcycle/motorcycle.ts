import { BLANK, BOX, GROUND, PLAYER_DOWN, PLAYER_LEFT, PLAYER_RIGHT, PLAYER_UP } from './constants'
import { Boxes, Coordinate, Direction, Maze, MovePlayer, State, Tile } from './types'
import { curry, decrement, equals, find, increment, length, map, or } from '167'
import { levelComplete, tryMove } from '@base/domain/model'

import { NonnegativeInteger } from '@base/common/types'

export const movePlayer: MovePlayer = curry(function movePlayer(
  maze: Maze,
  { player: { position: from }, boxes, moveCount }: State,
  direction: Direction
): State {
  const to = adjacentCoordinate[direction](from)
  const beyond = adjacentCoordinate[direction](to)
  const noPlayerMaze = mazeWithoutPlayer(maze)
  const noBoxMaze = mazeWithoutBoxes(noPlayerMaze)
  const currentMaze = mazeWithBoxes(noBoxMaze, boxes)
  const movedBoxes = map(moveBox(currentMaze, to, beyond), boxes)
  const movedBoxesMaze = mazeWithBoxes(noBoxMaze, movedBoxes)
  const position = tryMove(movedBoxesMaze[to.y][to.x]) ? to : from

  return {
    player: { position, direction },
    boxes: movedBoxes,
    maze: movedBoxesMaze,
    moveCount: equals(position, to) ? increment(moveCount) : moveCount,
    levelComplete: levelComplete(maze, movedBoxes),
  }
})

const adjacentCoordinate: { [key in Direction]: (from: Coordinate) => Coordinate } = {
  up: ({ x, y }) => ({ x, y: decrement(y) }),
  right: ({ x, y }) => ({ x: increment(x), y }),
  down: ({ x, y }) => ({ x, y: increment(y) }),
  left: ({ x, y }) => ({ x: decrement(x), y }),
}

function mazeWithoutPlayer(maze: Maze): Maze {
  return map(row => map(replacePlayer, row), maze)
}

function replacePlayer(tile: Tile): Tile {
  const isPlayerUp = equals(PLAYER_UP, tile)
  const isPlayerRight = equals(PLAYER_RIGHT, tile)
  const isPlayerDown = equals(PLAYER_DOWN, tile)
  const isPlayerLeft = equals(PLAYER_LEFT, tile)

  return or(or(or(isPlayerUp, isPlayerRight), isPlayerDown), isPlayerLeft) ? GROUND : tile
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
): Coordinate {
  const { x, y } = beyond
  const height = length(maze)
  const width = length(maze[0])
  const withinBounds = x >= 0 && x < width && (y >= 0 && y < height)
  const tile = withinBounds ? maze[y][x] : BLANK

  return equals(to, box) && tryMove(tile) ? beyond : box
})
