import { Test, describe, given, it } from '@typed/test'

import { EventDelegationDom } from './Doms'
import { eventDelegationDomFrom } from './eventDelegationDomFrom'
import { now } from '@motorcycle/stream'

export const test: Test = describe(`eventDelegationDomFrom`, [
  given(`a stream of elements`, [
    it(`returns a EventDelegationDom`, ({ equal }) => {
      const element = document.createElement('div')
      const dom: EventDelegationDom = eventDelegationDomFrom(now(element))

      equal('function', typeof dom.event)
      equal('function', typeof dom.elements)
      equal('function', typeof dom.cssSelectors)
      equal('function', typeof dom.query)
    }),
  ]),
])
