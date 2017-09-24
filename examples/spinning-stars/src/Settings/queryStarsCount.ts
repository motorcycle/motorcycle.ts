import { DomSource, events, query } from '@motorcycle/dom'

import { NonnegativeInteger } from '@base/common/types'
import { STARS_COUNT_CSS_CLASS } from './view'
import { Stream } from '@motorcycle/types'
import { map } from '@motorcycle/stream'

export function queryStarsCount(dom: DomSource): Stream<NonnegativeInteger> {
  const starsCount = query(`.${STARS_COUNT_CSS_CLASS}`, dom)
  const change$ = events('change', starsCount)
  const starsCount$ = map(starsCountValue, change$)

  return starsCount$
}

function starsCountValue({ target }: { target: EventTarget }): NonnegativeInteger {
  const { value } = target as HTMLInputElement

  return Number(value)
}
