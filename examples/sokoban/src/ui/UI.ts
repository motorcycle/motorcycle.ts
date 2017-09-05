import { Level, LevelCompletion, UISinks, UISources } from './types'
import {
  ap,
  combineObj,
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
import { Stream } from '@motorcycle/types'
import { canIncrementLevel } from './canIncrementLevel'
import { mazeSize } from './mazeSize'
import { pictureOfMaze } from './pictureOfMaze'

const DEFAULT_LEVEL_COMPLETION = { levelCompleted: true, allLevelsCompleted: false }

export function UI({ state$, elapsedTime$, allLevelsCompleted$, document }: UISources): UISinks {
  const key$ = key(document)
  const quit$ = startWith(true, filter<true>(Boolean, map(key => reset[key], key$)))
  const start$ = filter<true>(Boolean, map(key => start[key], key$))

  const levelCompleted$ = map(({ levelCompleted }) => levelCompleted, state$)
  const go$ = filter<Direction>(
    Boolean,
    sample(
      (direction, canMove) => (canMove ? direction : false),
      filter<Direction>(Boolean, map(key => direction[key], key$)),
      map(not, levelCompleted$)
    )
  )

  const levelCompletion$: Stream<LevelCompletion> = sampleWith(
    start$,
    startWith(
      DEFAULT_LEVEL_COMPLETION,
      combineObj({
        levelCompleted: levelCompleted$,
        allLevelsCompleted: allLevelsCompleted$,
      })
    )
  )
  const level$ = scan(
    (level, f: Level) => f(level),
    0,
    mergeArray([
      constant(increment, filter(canIncrementLevel, levelCompletion$)),
      constant(() => 0, quit$),
      constant(
        (level: NonnegativeInteger) => level,
        filter(not, sampleWith(start$, levelCompleted$))
      ),
    ])
  )

  const pictureOfMaze$ = map(pictureOfMaze, state$)
  const mazeSize$ = map(({ maze }) => mazeSize(maze), state$)
  const moveCount$ = map(({ moveCount }) => moveCount, state$)
  const sokoban$ = ap(
    ap(
      ap(ap(ap(map(sokoban, pictureOfMaze$), mazeSize$), levelCompleted$), moveCount$),
      elapsedTime$
    ),
    allLevelsCompleted$
  )

  const startScreen$ = map(startScreen, quit$)
  const viewToggle$ = merge(constant(true, start$), constant(false, quit$))
  const view$ = switchLatest(map(toggle => (toggle ? sokoban$ : startScreen$), viewToggle$))

  return { view$, go$, start$, level$ }
}
