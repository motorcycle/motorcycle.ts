import { Direction, Down, Left, Right, Up } from '@base/domain/model'
import { DomSource, events } from '@motorcycle/dom'
import { UISinks, UISources, drawMaze, view } from './'
import { combineObj, constant, filter, map, mergeArray, sampleWith } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'

export function UI(sources: UISources): UISinks {
  const { maze$, movePlayerTo$, playerDirection$, document } = sources
  const drawMaze$ = combineObj({
    maze: maze$,
    movePlayerTo: movePlayerTo$,
    playerDirection: playerDirection$,
  })
  const pictureOfMaze$ = map(drawMaze, drawMaze$)
  const view$ = map(view, pictureOfMaze$)
  const keyDown$ = keyDown(document)
  const movePlayerInDirection$ = direction(keyDown$)
  const movePlayerFrom$ = sampleWith(movePlayerInDirection$, movePlayerTo$)
  const reset$ = reset(keyDown$)

  // The order of the returned sinks are important here because of interdependency.
  return { view$, reset$, movePlayerFrom$, movePlayerInDirection$ }
}

const keyDown = (document: DomSource<Document, Event>) => events('keydown', document)

function direction(keyDown$: Stream<KeyboardEvent>): Stream<Direction> {
  const upArrow$: Stream<Up> = constant('up', filter(isUpArrow, keyDown$))
  const rightArrow$: Stream<Right> = constant('right', filter(isRightArrow, keyDown$))
  const downArrow$: Stream<Down> = constant('down', filter(isDownArrow, keyDown$))
  const leftArrow$: Stream<Left> = constant('left', filter(isLeftArrow, keyDown$))
  const direction$: Stream<Direction> = mergeArray([upArrow$, rightArrow$, downArrow$, leftArrow$])

  return direction$
}

const isUpArrow = ({ key }: { key: string }) => key === `ArrowUp`
const isRightArrow = ({ key }: { key: string }) => key === `ArrowRight`
const isDownArrow = ({ key }: { key: string }) => key === `ArrowDown`
const isLeftArrow = ({ key }: { key: string }) => key === `ArrowLeft`

const reset = (keyDown$: Stream<KeyboardEvent>) =>
  constant(true, filter(isEscape, keyDown$)) as Stream<true>

const isEscape = ({ key }: { key: string }) => key === `Escape`
