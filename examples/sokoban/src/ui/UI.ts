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

  const direction$ = direction(document)
  const movePlayerFrom$ = sampleWith(direction$, movePlayerTo$)

  return { view$, movePlayerFrom$, direction$ }
}

function direction(documentDom: DomSource<Document, Event>): Stream<Direction> {
  const keyDown$ = events('keydown', documentDom)
  const upArrow$: Stream<Up> = constant('up', filter(isUpArrow, keyDown$))
  const rightArrow$: Stream<Right> = constant('right', filter(isRightArrow, keyDown$))
  const downArrow$: Stream<Down> = constant('down', filter(isDownArrow, keyDown$))
  const leftArrow$: Stream<Left> = constant('left', filter(isLeftArrow, keyDown$))
  const direction$: Stream<Direction> = mergeArray([upArrow$, rightArrow$, downArrow$, leftArrow$])

  return direction$
}

const isUpArrow = (event: KeyboardEvent) => event.key === `ArrowUp`
const isRightArrow = (event: KeyboardEvent) => event.key === `ArrowRight`
const isDownArrow = (event: KeyboardEvent) => event.key === `ArrowDown`
const isLeftArrow = (event: KeyboardEvent) => event.key === `ArrowLeft`
