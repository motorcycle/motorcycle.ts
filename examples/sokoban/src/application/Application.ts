import { ApplicationSinks, ApplicationSources, State } from './types'
import { constant, map, merge, scan, switchLatest } from '@motorcycle/stream'
import { gameWon, maze0 } from '@base/domain/model'

import { boxes } from './boxes'
import { movePlayer } from './movePlayer'
import { player } from './player'

const maze = maze0
const initialState: State = { player: player(maze), boxes: boxes(maze), maze }

export function Application({ go$, start$, reset$ }: ApplicationSinks): ApplicationSources {
  const initialState$ = constant(initialState, merge(reset$, start$))
  const state$ = switchLatest(
    map(initialState => scan(movePlayer, initialState, go$), initialState$)
  )
  const gameWon$ = map(({ boxes }) => gameWon(boxes), state$)

  return { state$, gameWon$ }
}
