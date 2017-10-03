import { DomSource, events, query } from '@motorcycle/dom'

import { NonnegativeInteger } from '@base/common/types'
import { SPEED_INPUT_CSS_CLASS } from './view'
import { Stream } from '@motorcycle/types'
import { map } from '@motorcycle/stream'

export function querySpeed(dom: DomSource): Stream<NonnegativeInteger> {
  const starsSpeed = query(`.${SPEED_INPUT_CSS_CLASS}`, dom)
  const change$ = events('change', starsSpeed)
  const starsSpeed$ = map(starsSpeedValue, change$)

  return starsSpeed$
}

function starsSpeedValue({ target }: { target: EventTarget }): NonnegativeInteger {
  const { value } = target as HTMLInputElement

  return Number(value)
}
