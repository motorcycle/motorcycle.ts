import { ApplicationSinks, ApplicationSources, State } from './types'
import { Maze, mazes } from '@base/domain/model'
import { map, scan, switchLatest, tap } from '@motorcycle/stream'

import { NonnegativeInteger } from '@base/common/types'
import { boxes } from './boxes'
import { increment } from '167'
import { movePlayer } from './movePlayer'
import { player } from './player'

export function Application({ go$, start$ }: ApplicationSinks): ApplicationSources {
  const level$ = tap(
    console.log,
    scan(level => increment(level), -1, tap(x => console.log(`start`, x), start$))
  )
  const maze$ = map(loadMaze, level$)
  const initialState$ = map(initialState, maze$)
  const state$ = switchLatest(map(state => scan(movePlayer, state, go$), initialState$))

  return { state$ }
}

function loadMaze(level: NonnegativeInteger): Maze {
  console.log(`load maze`, level)
  const maze = mazes[level > 0 ? level : 0]

  return maze
}

function initialState(maze: Maze): State {
  console.log(`initial state`)
  return {
    player: player(maze),
    boxes: boxes(maze),
    maze,
    levelComplete: false,
  }
}
