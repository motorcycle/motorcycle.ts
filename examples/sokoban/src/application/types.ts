import { Boxes, Coordinate, Direction, Maze, State } from '@base/domain/model'
import { EffectfulComponent, Stream } from '@motorcycle/types'
import { NonnegativeInteger, PositiveInteger } from '@base/common/types'

// Re-export, so UI doesn’t query the domain directly.
export * from '@base/domain/model/types'

export type ApplicationComponent = EffectfulComponent<ApplicationSinks, ApplicationSources>

export type ApplicationSinks = {
  readonly go$: Stream<Direction>
  readonly start$: Stream<boolean>
  readonly level$: Stream<PositiveInteger>
}

export type ApplicationSources = {
  readonly state$: Stream<State>
  readonly allLevelsCompleted$: Stream<boolean>
  readonly elapsedTime$: Stream<NonnegativeInteger>
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

export type MazeWithBoxes = {
  (maze: Maze, boxes: Boxes): Maze
  (maze: Maze): MazeWithBoxesArity1
}

export type MazeWithBoxesArity1 = {
  (boxes: Boxes): Maze
}

export type MoveBox = {
  (maze: Maze, to: Coordinate, beyond: Coordinate, box: Coordinate): Coordinate
  (maze: Maze, to: Coordinate, beyond: Coordinate): MoveBoxArity1
  (maze: Maze, to: Coordinate): MoveBoxArity2
  (maze: Maze): MoveBoxArity3
}

export type MoveBoxArity1 = {
  (box: Coordinate): Coordinate
}

export type MoveBoxArity2 = {
  (beyond: Coordinate, box: Coordinate): Coordinate
  (beyond: Coordinate): MoveBoxArity1
}

export type MoveBoxArity3 = {
  (to: Coordinate, beyond: Coordinate, box: Coordinate): Coordinate
  (to: Coordinate, beyond: Coordinate): MoveBoxArity1
  (to: Coordinate): MoveBoxArity2
}
