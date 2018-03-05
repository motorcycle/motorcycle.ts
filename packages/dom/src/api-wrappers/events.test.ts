import { Test, describe, given, it } from '@typed/test'
import { now, observe, take } from '@motorcycle/stream'

import { EventDelegationDom } from '../Doms'
import { event } from './events'

export const test: Test = describe(`event`, [
  it(`is a function`, ({ equal }) => {
    equal(`function`, typeof event)
  }),

  given(`an event type and a Dom`, [
    it(`returns a stream of events`, ({ equal }) => {
      const element = document.createElement('div')
      const dom = new EventDelegationDom(now(element), [])
      const eventType = 'click'

      const event$ = event<Element, Event>(eventType, dom)

      setTimeout(function() {
        element.dispatchEvent(new Event(eventType, { bubbles: true }))
      })

      return observe(event => equal(eventType, event.type), take(1, event$))
    }),
  ]),
])
