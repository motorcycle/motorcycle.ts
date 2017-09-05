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
  startWith,
  switchLatest,
} from '@motorcycle/stream'
import { curry, increment, not } from '167'

import { NonnegativeInteger } from '@base/common/types'
import { Stream } from '@motorcycle/types'
import { boxes } from './boxes'
import { movePlayer } from './movePlayer'
import { player } from './player'

export function Application({ go$, level$ }: ApplicationSinks): ApplicationSources {
  const heldLevel$ = hold(level$)
  const maze$ = map(loadMaze, heldLevel$)
  const initialState$ = map(initialState, maze$)
  const state$ = hold(switchLatest(map(keepState(go$), initialState$)))
  const levelCompleted$ = map(({ levelCompleted }) => levelCompleted, state$)
  const elapsedTime$ = filter(
    time => time > -1,
    sample(
      (time, completed) => (completed ? -1 : time),
      switchLatest(constant(timer(), filter(Boolean, maze$))),
      levelCompleted$
    )
  )
  const allLevelsCompleted$ = startWith(
    false,
    map(
      ({ completed, level }) => areAllLevelsCompleted(completed, level),
      sample((completed, level) => ({ completed, level }), levelCompleted$, heldLevel$)
    )
  )

  return { state$, elapsedTime$, allLevelsCompleted$ }
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
    levelCompleted: false,
  }
}

function timer(): Stream<NonnegativeInteger> {
  return skip(1, scan(t => increment(t), -1, periodic(1000)))
}

const keepState = curry(function keepState(go$: Stream<Direction>, state: State) {
  const { maze } = state

  return scan(movePlayer(maze), state, go$)
})

function areAllLevelsCompleted(completed: boolean, level: NonnegativeInteger): boolean {
  if (completed && not(mazes[increment(level)])) return true

  return false
}
