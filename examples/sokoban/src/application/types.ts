import { Direction, State } from '@base/domain/model'
import { EffectfulComponent, Stream } from '@motorcycle/types'

export {
  Coordinate,
  Direction,
  Boxes,
  Maze,
  Tile,
  Wall,
  Ground,
  Storage,
  Box,
  Blank,
  State,
} from '@base/domain/model'

export type ApplicationComponent = EffectfulComponent<ApplicationSinks, ApplicationSources>

export type ApplicationSinks = {
  readonly movePlayerInDirection$: Stream<Direction>
}

export type ApplicationSources = {
  readonly state$: Stream<State>
}
