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
import { sokoban, startScreen } from './views'

import { Direction } from '@base/application/types'
import { direction } from './direction'
import { key } from './key'
import { mazeSize } from './mazeSize'
import { not } from '167'
import { pictureOfMaze } from './pictureOfMaze'
import { reset } from './reset'
import { start } from './start'

export function UI({ state$, gameWon$, document }: UISources): UISinks {
  const key$ = key(document)
  const reset$ = startWith(true, filter<true>(Boolean, map(key => reset[key], key$)))
  const start$ = filter<true>(Boolean, map(key => start[key], key$))
  const go$ = filter<Direction>(
    Boolean,
    sample(
      (direction, gameWon) => (not(gameWon) ? direction : false),
      filter<Direction>(Boolean, map(key => direction[key], key$)),
      gameWon$
    )
  )

  const pictureOfMaze$ = map(pictureOfMaze, state$)
  const mazeSize$ = map(({ maze }) => mazeSize(maze), state$)
  const sokoban$ = ap(ap(map(sokoban, pictureOfMaze$), mazeSize$), gameWon$)

  const startScreen$ = map(startScreen, reset$)
  const viewToggle$ = merge(constant(true, start$), constant(false, reset$))
  const view$ = switchLatest(map(toggle => (toggle ? sokoban$ : startScreen$), viewToggle$))

  return { view$, go$, reset$, start$ }
}
