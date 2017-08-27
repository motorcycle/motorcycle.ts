import { UISinks, UISources } from './types'
import { ap, filter, map, sampleWith } from '@motorcycle/stream'

import { direction } from './direction'
import { key } from './key'
import { mazeSize } from './mazeSize'
import { pictureOfMaze } from './pictureOfMaze'
import { view } from './view'

export function UI(sources: UISources): UISinks {
  const { maze$, movePlayerTo$, playerDirection$, document } = sources
  const pictureOfMaze$ = ap(ap(map(pictureOfMaze, maze$), movePlayerTo$), playerDirection$)
  const mazeSize$ = map(mazeSize, maze$)
  const view$ = ap(map(view, pictureOfMaze$), mazeSize$)
  const key$ = key(document)
  const movePlayerInDirection$ = filter(direction => !!direction, map(key => direction[key], key$))
  const movePlayerFrom$ = sampleWith(movePlayerInDirection$, movePlayerTo$)

  // The order of the returned sinks are important because of interdependency.
  return { view$, movePlayerFrom$, movePlayerInDirection$ }
}
