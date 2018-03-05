import { Test, describe, given, it } from '@typed/test'

import { Dom } from '../'
import { EventDelegationDom } from '../Doms'
import { now } from '@motorcycle/stream'
import { useCapture } from './useCapture'

export const test: Test = describe(`useCapture`, [
  given(`a Dom`, [
    it(`returns a new Dom`, ({ equal }) => {
      const element: Element = document.createElement(`div`)
      const domSource: Dom = new EventDelegationDom(now(element), [])
      const dom: Dom = useCapture(domSource)

      equal('function', typeof dom.event)
      equal('function', typeof dom.elements)
      equal('function', typeof dom.cssSelectors)
      equal('function', typeof dom.query)
    }),

    describe(`Dom`, [
      describe(`event`, [
        it(`calls Dom with useCapture true`, ({ ok, equal }, done) => {
          const eventType = 'click'
          const domSource = {
            event(type: string, options: EventListenerOptions) {
              equal(eventType, type)
              ok(!!options.capture)
              done()
            },
          } as Dom

          const dom = useCapture(domSource)

          dom.event(eventType)
        }),
      ]),
    ]),
  ]),
])
