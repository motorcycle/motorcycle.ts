import { Test, describe, given, it } from '@typed/test'

import { EventDelegationDomSource } from '../DomSources'
import { collectEventsFor } from '@motorcycle/test'
import { elements } from './elements'
import { now } from '@motorcycle/stream'

export const test: Test = describe(`elements`, [
  it(`is a function`, ({ equal }) => {
    equal(`function`, typeof elements)
  }),

  given(`a DomSource`, [
    it(`returns a stream of elements`, ({ equal }) => {
      const element = document.createElement('div')
      const dom = new EventDelegationDomSource(now(element), [])

      const elements$ = elements<Element, Event>(dom)

      return collectEventsFor(1, elements$).then(equal([[element]]))
    }),
  ]),
])
