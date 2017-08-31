import { UISinks, UISources } from './types'
import { ap, constant, filter, map, merge, startWith, switchLatest } from '@motorcycle/stream'
import { sokoban, startScreen } from './views'

import { direction } from './direction'
import { key } from './key'
import { mazeSize } from './mazeSize'
import { pictureOfMaze } from './pictureOfMaze'
import { reset } from './reset'
import { start } from './start'

export function UI({ state$, document }: UISources): UISinks {
  const key$ = key(document)
  const reset$ = startWith(true, filter(Boolean, map(key => reset[key], key$)))
  const start$ = filter(Boolean, map(key => start[key], key$))
  const go$ = filter(Boolean, map(key => direction[key], key$))

  const pictureOfMaze$ = map(pictureOfMaze, state$)
  const mazeSize$ = map(({ maze }) => mazeSize(maze), state$)
  const sokoban$ = ap(map(sokoban, pictureOfMaze$), mazeSize$)

  const startScreen$ = map(startScreen, reset$)
  const viewToggle$ = merge(constant(true, start$), constant(false, reset$))
  const view$ = switchLatest(map(toggle => (toggle ? sokoban$ : startScreen$), viewToggle$))

  return { view$, go$, reset$, start$ }
}
