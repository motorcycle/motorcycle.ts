import { ApplicationSinks, ApplicationSources, Direction, State } from './types'
import { Maze, mazes } from '@base/domain/model'
import {
  constant,
  filter,
  hold,
  map,
  periodic,
  sample,
  scan,
  skip,
  switchLatest,
} from '@motorcycle/stream'
import { curry, increment } from '167'

import { NonnegativeInteger } from '@base/common/types'
import { Stream } from '@motorcycle/types'
import { boxes } from './boxes'
import { movePlayer } from './movePlayer'
import { player } from './player'

export function Application({ go$, level$ }: ApplicationSinks): ApplicationSources {
  const maze$ = map(loadMaze, level$)
  const initialState$ = map(initialState, maze$)
  const state$ = hold(switchLatest(map(keepState(go$), initialState$)))
  const levelCompleted$ = map(({ levelComplete }) => levelComplete, state$)
  const elapsedTime$ = filter(
    time => time > -1,
    sample(
      (time, complete) => (complete ? -1 : time),
      switchLatest(constant(timer(), maze$)),
      levelCompleted$
    )
  )

  return { state$, elapsedTime$ }
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
    moveCount: 0,
    levelComplete: false,
  }
}

function timer(): Stream<NonnegativeInteger> {
  return skip(1, scan(t => increment(t), -1, periodic(1000)))
}

const keepState = curry(function keepState(go$: Stream<Direction>, state: State) {
  const { maze } = state

  return scan(movePlayer(maze), state, go$)
})
