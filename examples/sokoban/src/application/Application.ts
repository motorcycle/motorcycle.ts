import { ApplicationSinks, ApplicationSources, State } from './types'
import { constant, map, merge, scan, switchLatest } from '@motorcycle/stream'

import { boxes } from './boxes'
import { maze0 } from '@base/domain/model'
import { movePlayer } from './movePlayer'
import { player } from './player'

const maze = maze0
const initialState: State = { player: player(maze), boxes: boxes(maze), maze }

export function Application({ go$, start$, reset$ }: ApplicationSinks): ApplicationSources {
  const initialState$ = constant(initialState, merge(reset$, start$))
  const state$ = switchLatest(
    map(initialState => scan(movePlayer, initialState, go$), initialState$)
  )

  return { state$ }
}
