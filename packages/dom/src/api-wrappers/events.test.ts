import { Test, describe, given, it } from '@typed/test'
import { now, observe, take } from '@motorcycle/stream'

import { EventDelegationDomSource } from '../DomSources'
import { events } from './events'

export const test: Test = describe(`events`, [
  it(`is a function`, ({ equal }) => {
    equal(`function`, typeof events)
  }),

  given(`an event type and a DomSource`, [
    it(`returns a stream of events`, ({ equal }) => {
      const element = document.createElement('div')
      const dom = new EventDelegationDomSource(now(element), [])
      const eventType = 'click'

      const event$ = events<Element, Event>(eventType, dom)

      setTimeout(function() {
        element.dispatchEvent(new Event(eventType, { bubbles: true }))
      })

      return observe(event => equal(eventType, event.type), take(1, event$))
    }),
  ]),
])
