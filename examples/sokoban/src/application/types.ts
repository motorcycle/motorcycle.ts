import { Direction, Maze, State } from '@base/domain/model'
import { EffectfulComponent, Stream } from '@motorcycle/types'

// Re-export, so UI doesn’t query the domain directly.
export * from '@base/domain/model/types'

export type ApplicationComponent = EffectfulComponent<ApplicationSinks, ApplicationSources>

export type ApplicationSinks = {
  readonly go$: Stream<Direction>
  // TODO: quit$ is not being used by the application and is purely UI functionality for now
  readonly quit$: Stream<boolean>
  readonly start$: Stream<boolean>
}

export type ApplicationSources = {
  readonly state$: Stream<State>
}

export type MovePlayer = {
  (maze: Maze, state: State, direction: Direction): State

  (maze: Maze, state: State): MovePlayerArity1
  (maze: Maze): MovePlayerArity2
}

export type MovePlayerArity2 = {
  (state: State, direction: Direction): State
  (state: State): MovePlayerArity1
}

export type MovePlayerArity1 = {
  (direction: Direction): State
}
