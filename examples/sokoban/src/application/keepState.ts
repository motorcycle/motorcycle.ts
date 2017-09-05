import { Direction, State } from './types'

import { Stream } from '@motorcycle/types'
import { curry } from '167'
import { movePlayer } from './movePlayer'
import { scan } from '@motorcycle/stream'

export const keepState: KeepState = curry(function keepState(
  go$: Stream<Direction>,
  state: State
): Stream<State> {
  const { maze } = state

  return scan(movePlayer(maze), state, go$)
})

export type KeepState = {
  (go$: Stream<Direction>, state: State): Stream<State>
  (go$: Stream<Direction>): KeepStateArity1
}

export type KeepStateArity1 = {
  (state: State): Stream<State>
}
