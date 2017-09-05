import { Maze, State } from './types'

import { boxes } from './boxes'
import { player } from './player'

export const initialState = (maze: Maze): State => ({
  player: player(maze),
  boxes: boxes(maze),
  maze,
  moveCount: 0,
  levelCompleted: false,
})
