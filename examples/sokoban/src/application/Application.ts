import { ApplicationSinks, ApplicationSources, Direction, State } from './types'
import { createProxy, sample, startWith } from '@motorcycle/stream'

import { boxes } from './boxes'
import { maze0 } from '@base/domain/model'
import { movePlayer } from './movePlayer'
import { player } from './player'

export function Application(sinks: ApplicationSinks): ApplicationSources {
  const { go$ } = sinks
  const { attach, stream: proxyState$ } = createProxy<State>()
  const maze = maze0
  const initialState: State = { player: player(maze), boxes: boxes(maze), maze }
  const { player: { direction } } = initialState
  const state$ = attach(
    sample<Direction, State, State>(
      movePlayer,
      startWith(direction, go$),
      startWith(initialState, proxyState$)
    )
  )

  return { state$ }
}
