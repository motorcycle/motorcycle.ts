import { ChangeLevel, LevelCompletion, UISinks, UISources } from './types'
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
import { directionKeys, key, keyed, resetKeys, startKeys } from './interaction'
import { id, increment, not } from '167'
import { sokoban, startScreen } from './views'

import { Direction } from '@base/application/types'
import { NO_LEVEL } from './constants'
import { Stream } from '@motorcycle/types'
import { canIncrementLevel } from './canIncrementLevel'
import { goInDirection } from './goInDirection'
import { mazeSize } from './mazeSize'
import { pictureOfMaze } from './pictureOfMaze'
import { quit } from './quit'

const DEFAULT_LEVEL_COMPLETION = { levelCompleted: true, allLevelsCompleted: false }

export function UI({ state$, allLevelsCompleted$, elapsedTime$, document }: UISources): UISinks {
  const key$ = key(document)
  const quit$ = startWith(true, filter<true>(Boolean, map(keyed(resetKeys), key$)))
  const start$ = filter<true>(Boolean, map(keyed(startKeys), key$))

  const levelCompleted$ = map(({ levelCompleted }) => levelCompleted, state$)
  const go$ = filter<Direction>(
    Boolean,
    sample(
      goInDirection,
      filter<Direction>(Boolean, map(keyed(directionKeys), key$)),
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
    (level, f: ChangeLevel) => f(level),
    NO_LEVEL,
    mergeArray([
      constant(increment, filter(canIncrementLevel, levelCompletion$)),
      constant(quit, quit$),
      constant(id, filter(not, sampleWith(start$, levelCompleted$))),
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
