import { DomSource, events, query } from '@motorcycle/dom'

import { NonnegativeInteger } from '@base/common/types'
import { Stream } from '@motorcycle/types'
import { curry2 } from '@typed/prelude';
import { map } from '@motorcycle/stream'

export const queryInputChange = curry2(function queryInputChange(dom: DomSource, cssSelector: string): Stream<NonnegativeInteger> {
  const source = query(`.${cssSelector}`, dom)
  const change$ = events('change', source)
  const value$ = map(value, change$)

  return value$
})

function value({ target }: { target: EventTarget }): NonnegativeInteger {
  const { value } = target as HTMLInputElement

  return Number(value)
}
