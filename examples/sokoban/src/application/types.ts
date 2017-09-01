import { Direction, State } from '@base/domain/model'
import { EffectfulComponent, Stream } from '@motorcycle/types'

// Re-export, so UI doesn’t query the domain directly.
export * from '@base/domain/model/types'

export type ApplicationComponent = EffectfulComponent<ApplicationSinks, ApplicationSources>

export type ApplicationSinks = {
  readonly go$: Stream<Direction>
  readonly reset$: Stream<boolean>
  readonly start$: Stream<boolean>
}

export type ApplicationSources = {
  readonly state$: Stream<State>
  readonly gameWon$: Stream<boolean>
}

export type MovePlayer = {
  (state: State, direction: Direction): State

  (state: State): MovePlayerArity1
}

export type MovePlayerArity1 = {
  (direction: Direction): State
}
