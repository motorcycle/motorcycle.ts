import { DomSource, elements, query } from '@motorcycle/dom'
import { Just, fromJust, head } from '@typed/prelude'
import { UISinks, UISources } from '@base/types'
import { VNode, canvas, div } from '@motorcycle/mostly-dom'
import { hold, map } from '@motorcycle/stream'

import { Settings } from '@base/Settings'
import { Stream } from '@motorcycle/types'

const SPACE_ID = 'space'
const SPACE_CSS_SELECTOR = `#${SPACE_ID}`
const SPACE_WIDTH = '100%'
const SPACE_HEIGHT = '100%'

export function UI({ dom }: UISources): UISinks {
  const { view$: settingsView$, starsCount$, rotationSpeed$, starsTrail$, starsGlow$ } = Settings({ dom })
  const view$ = map(view, settingsView$)
  const canvas$ = hold(canvasSink(dom))

  return { view$, canvas$, starsCount$, rotationSpeed$, starsTrail$, starsGlow$ }
}

function view(settings: VNode): VNode {
  return div({ attrs: { style: `height: 100%; overflow: hidden` } }, [
    canvas({
      id: SPACE_ID,
      attrs: { style: `height: ${SPACE_HEIGHT}; width: ${SPACE_WIDTH}` },
    }),
    settings,
  ])
}

function canvasSink(dom: DomSource<Element, Event>): Stream<HTMLCanvasElement> {
  return map<ReadonlyArray<HTMLCanvasElement>, HTMLCanvasElement>(
    elements => fromJust(head(elements) as Just<HTMLCanvasElement>),
    elements(query(SPACE_CSS_SELECTOR, dom))
  )
}
