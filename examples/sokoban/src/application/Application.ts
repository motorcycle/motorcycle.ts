import { ApplicationSinks, ApplicationSources, State } from './types'
import { Maze, mazes } from '@base/domain/model'
import { hold, map, scan, switchLatest } from '@motorcycle/stream'

import { NonnegativeInteger } from '@base/common/types'
import { boxes } from './boxes'
import { movePlayer } from './movePlayer'
import { player } from './player'

export function Application({ go$, level$ }: ApplicationSinks): ApplicationSources {
  const maze$ = map(loadMaze, level$)
  const initialState$ = map(initialState, maze$)
  const state$ = hold(
    switchLatest(map(state => scan(movePlayer(state.maze), state, go$), initialState$))
  )

  return { state$ }
}

function loadMaze(level: NonnegativeInteger): Maze {
  const maze = mazes[level > 0 ? level : 0]

  return maze
}

function initialState(maze: Maze): State {
  return {
    player: player(maze),
    boxes: boxes(maze),
    maze,
    levelComplete: false,
  }
}
