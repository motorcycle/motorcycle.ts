import { canvas, VNode } from '@motorcycle/mostly-dom'

import { now, map, hold } from '@motorcycle/stream'
import { query, elements, DomSource } from '@motorcycle/dom'
import { head, Just, fromJust } from '@typed/prelude'
import { UISinks, UISources } from '@base/types'
import { Stream } from '@motorcycle/types'

const SPACE_ID = 'space'
const SPACE_CSS_SELECTOR = `#${SPACE_ID}`
const SPACE_WIDTH = '100%'
const SPACE_HEIGHT = '100%'

export function UI({ dom }: UISources): UISinks {
  const view$ = now(view())
  const canvas$ = hold(canvasSink(dom))

  return { view$, canvas$ }
}

function view(): VNode {
  return canvas({
    id: SPACE_ID,
    attrs: { style: `height: ${SPACE_HEIGHT}; width: ${SPACE_WIDTH}` },
  })
}

function canvasSink(dom: DomSource<Element, Event>): Stream<HTMLCanvasElement> {
  return map<ReadonlyArray<HTMLCanvasElement>, HTMLCanvasElement>(
    elements => fromJust(head(elements) as Just<HTMLCanvasElement>),
    elements(query(SPACE_CSS_SELECTOR, dom))
  )
}
