import { UISinks, UISources } from './types'
import {
  ap,
  constant,
  filter,
  map,
  merge,
  mergeArray,
  sample,
  sampleWith,
  scan,
  startWith,
  switchLatest,
} from '@motorcycle/stream'
import { direction, key, reset, start } from './interaction'
import { increment, not } from '167'
import { sokoban, startScreen } from './views'

import { Direction } from '@base/application/types'
import { NonnegativeInteger } from '@base/common/types'
import { mazeSize } from './mazeSize'
import { pictureOfMaze } from './pictureOfMaze'

export function UI({ state$, document }: UISources): UISinks {
  const key$ = key(document)
  const quit$ = startWith(true, filter<true>(Boolean, map(key => reset[key], key$)))
  const start$ = filter<true>(Boolean, map(key => start[key], key$))

  const levelComplete$ = map(({ levelComplete }) => levelComplete, state$)
  const go$ = filter<Direction>(
    Boolean,
    sample(
      (direction, canMove) => (canMove ? direction : false),
      filter<Direction>(Boolean, map(key => direction[key], key$)),
      map(not, levelComplete$)
    )
  )

  const level$ = scan(
    (level, f: Level) => f(level),
    0,
    mergeArray([
      constant(increment, filter(Boolean, sampleWith(start$, startWith(true, levelComplete$)))),
      constant(() => 0, quit$),
      constant(
        (level: NonnegativeInteger) => level,
        filter(not, sampleWith(start$, levelComplete$))
      ),
    ])
  )

  const pictureOfMaze$ = map(pictureOfMaze, state$)
  const mazeSize$ = map(({ maze }) => mazeSize(maze), state$)
  const moveCount$ = map(({ moveCount }) => moveCount, state$)
  const sokoban$ = ap(ap(ap(map(sokoban, pictureOfMaze$), mazeSize$), levelComplete$), moveCount$)

  const startScreen$ = map(startScreen, quit$)
  const viewToggle$ = merge(constant(true, start$), constant(false, quit$))
  const view$ = switchLatest(map(toggle => (toggle ? sokoban$ : startScreen$), viewToggle$))

  return { view$, go$, start$, level$ }
}

export type Level = (a: NonnegativeInteger) => NonnegativeInteger
