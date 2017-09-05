import { Direction, Maze, MovePlayer, State } from './types'
import { curry, equals, increment, map } from '167'
import { isLevelCompleted, tryMove } from '@base/domain/model'

import { adjacentLocation } from './adjacentLocation'
import { mazeWithBoxes } from './mazeWithBoxes'
import { mazeWithoutBoxes } from './mazeWithoutBoxes'
import { mazeWithoutPlayer } from './mazeWithoutPlayer'
import { moveBox } from './moveBox'

export const movePlayer: MovePlayer = curry(function movePlayer(
  maze: Maze,
  { player: { position: from }, boxes, moveCount }: State,
  direction: Direction
): State {
  const to = adjacentLocation[direction](from)
  const beyond = adjacentLocation[direction](to)
  const noPlayerMaze = mazeWithoutPlayer(maze)
  const noBoxMaze = mazeWithoutBoxes(noPlayerMaze)
  const currentMaze = mazeWithBoxes(noBoxMaze, boxes)
  const movedBoxes = map(moveBox(currentMaze, to, beyond), boxes)
  const movedBoxesMaze = mazeWithBoxes(noBoxMaze, movedBoxes)
  const { lat, long } = to
  const position = tryMove(movedBoxesMaze[long][lat]) ? to : from

  return {
    player: { position, direction },
    boxes: movedBoxes,
    maze: movedBoxesMaze,
    moveCount: equals(position, to) ? increment(moveCount) : moveCount,
    levelCompleted: isLevelCompleted(maze, movedBoxes),
  }
})
