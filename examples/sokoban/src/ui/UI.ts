import { UISinks, UISources } from './types'
import { ap, filter, map } from '@motorcycle/stream'

import { direction } from './direction'
import { key } from './key'
import { mazeSize } from './mazeSize'
import { pictureOfMaze } from './pictureOfMaze'
import { view } from './view'

export function UI(sources: UISources): UISinks {
  const { state$, document } = sources
  const pictureOfMaze$ = map(pictureOfMaze, state$)
  const mazeSize$ = map(({ maze }) => mazeSize(maze), state$)
  const view$ = ap(map(view, pictureOfMaze$), mazeSize$)
  const key$ = key(document)
  const movePlayerInDirection$ = filter(direction => !!direction, map(key => direction[key], key$))

  return { view$, movePlayerInDirection$ }
}
