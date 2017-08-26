import { Direction, Down, Left, Right, Up } from '@base/domain/model'
import { DomSource, createDocumentDomSource, events } from '@motorcycle/dom'
import { UISinks, UISources, drawMaze, view } from './'
import { combineObj, constant, filter, map, mergeArray, sampleWith, tap } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'

export function UI(sources: UISources): UISinks {
  const { maze$, movePlayerTo$, playerDirection$ } = sources
  const drawMaze$ = combineObj({
    maze: maze$,
    movePlayerTo: movePlayerTo$,
    playerDirection: playerDirection$,
  })
  const pictureOfMaze$ = map(drawMaze, drawMaze$)
  const view$ = map(view, pictureOfMaze$)

  // TODO: move to bootstrap
  const document$ = constant(document, view$)
  const documentDom = createDocumentDomSource(document$)

  const direction$ = direction(documentDom)
  const movePlayerFrom$ = tap(console.log, sampleWith(direction$, movePlayerTo$))

  return { view$, direction$, movePlayerFrom$ }
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
