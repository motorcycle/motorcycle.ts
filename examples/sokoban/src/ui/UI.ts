import { UISinks, UISources } from './types'
import {
  ap,
  constant,
  filter,
  map,
  merge,
  sample,
  startWith,
  switchLatest,
} from '@motorcycle/stream'
import { direction, key, reset, start } from './interaction'
import { sokoban, startScreen } from './views'

import { Direction } from '@base/application/types'
import { mazeSize } from './mazeSize'
import { not } from '167'
import { pictureOfMaze } from './pictureOfMaze'

export function UI({ state$, document }: UISources): UISinks {
  const key$ = key(document)
  const quit$ = startWith(true, filter<true>(Boolean, map(key => reset[key], key$)))
  const start$ = filter<true>(Boolean, map(key => start[key], key$))
  const go$ = filter<Direction>(
    Boolean,
    sample(
      (direction, { levelComplete }) => (not(levelComplete) ? direction : false),
      filter<Direction>(Boolean, map(key => direction[key], key$)),
      state$
    )
  )

  const pictureOfMaze$ = map(pictureOfMaze, state$)
  const mazeSize$ = map(({ maze }) => mazeSize(maze), state$)
  const levelComplete$ = map(({ levelComplete }) => levelComplete, state$)
  const sokoban$ = ap(ap(map(sokoban, pictureOfMaze$), mazeSize$), levelComplete$)

  const startScreen$ = map(startScreen, quit$)
  const viewToggle$ = merge(constant(true, start$), constant(false, quit$))
  const view$ = switchLatest(map(toggle => (toggle ? sokoban$ : startScreen$), viewToggle$))

  return { view$, go$, quit$, start$ }
}
