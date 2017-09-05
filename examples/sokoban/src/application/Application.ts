import { ApplicationSinks, ApplicationSources, Seconds, State } from './types'
import { constant, filter, hold, map, sample, startWith, switchLatest } from '@motorcycle/stream'

import { areAllLevelsCompleted } from '@base/domain/model/areAllLevelsCompleted'
import { elapsedTime } from './elapsedTime'
import { initialState } from './initialState'
import { keepState } from './keepState'
import { loadMaze } from './loadMaze'

export function Application({ go$, level$ }: ApplicationSinks): ApplicationSources {
  const heldLevel$ = hold(level$)
  const maze$ = map(loadMaze, heldLevel$)
  const initialState$ = map(initialState, maze$)
  const state$ = hold<State>(switchLatest(map(keepState(go$), initialState$)))
  const levelCompleted$ = map(({ levelCompleted }) => levelCompleted, state$)
  const allLevelsCompleted$ = startWith(
    false,
    map(
      ({ completed, level }) => areAllLevelsCompleted(completed, level),
      sample((completed, level) => ({ completed, level }), levelCompleted$, heldLevel$)
    )
  )
  const elapsedTime$ = filter<Seconds>(
    time => time > -1,
    sample(
      (time, completed) => (completed ? -1 : time),
      switchLatest(constant(elapsedTime(), filter(Boolean, maze$))),
      levelCompleted$
    )
  )

  return { state$, allLevelsCompleted$, elapsedTime$ }
}
