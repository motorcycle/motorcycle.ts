import { UISinks, UISources } from './types'
import { ap, filter, map } from '@motorcycle/stream'

import { direction } from './direction'
import { key } from './key'
import { mazeSize } from './mazeSize'
import { pictureOfMaze } from './pictureOfMaze'
import { view } from './view'

export function UI(sources: UISources): UISinks {
  const { state$, document } = sources
  const maze$ = map(({ maze }) => maze, state$)
  const playerPosition$ = map(({ playerPosition }) => playerPosition, state$)
  const playerDirection$ = map(({ playerDirection }) => playerDirection, state$)
  const pictureOfMaze$ = ap(ap(map(pictureOfMaze, maze$), playerPosition$), playerDirection$)
  const mazeSize$ = map(mazeSize, maze$)
  const view$ = ap(map(view, pictureOfMaze$), mazeSize$)
  const key$ = key(document)
  const movePlayerInDirection$ = filter(direction => !!direction, map(key => direction[key], key$))

  // The order of the returned sinks are important because of interdependency.
  return { view$, movePlayerInDirection$ }
}
