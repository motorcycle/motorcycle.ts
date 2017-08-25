import { Direction, Down, Left, Right, Up } from '@base/domain/model'
import { DomSource, createDocumentDomSource, events } from '@motorcycle/dom'
import { UISinks, UISources, drawMaze, view } from './'
import { combineObj, constant, filter, hold, map, mergeArray, sampleWith } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'

export function UI(sources: UISources): UISinks {
  const { maze$, toCoordinate$ } = sources
  const movePlayerTo$ = hold(toCoordinate$)
  const drawMaze$ = combineObj({ maze: maze$, movePlayerTo: movePlayerTo$ })
  const pictureOfMaze$ = map(drawMaze, drawMaze$)
  const view$ = map(view, pictureOfMaze$)
  const document$ = constant(document, view$)
  const documentDom = createDocumentDomSource(document$)
  const direction$ = direction(documentDom)
  const fromCoordinate$ = sampleWith(direction$, movePlayerTo$)

  return { view$, direction$, fromCoordinate$ }
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
