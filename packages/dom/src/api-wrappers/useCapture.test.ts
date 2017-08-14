import { DocumentDomSource, DomSource } from '../'
import { Test, describe, given, it } from '@typed/test'

import { EventDelegationDomSource } from '../DomSources'
import { now } from '@motorcycle/stream'
import { useCapture } from './useCapture'

export const test: Test = describe(`useCapture`, [
  given(`a DomSource`, [
    it(`returns a new DomSource`, ({ equal }) => {
      const element: Element = document.createElement(`div`)
      const domSource: DomSource = new EventDelegationDomSource(now(element), [])
      const dom: DomSource = useCapture(domSource)

      equal('function', typeof dom.events)
      equal('function', typeof dom.elements)
      equal('function', typeof dom.cssSelectors)
      equal('function', typeof dom.query)
    }),

    describe(`DomSource`, [
      describe(`events`, [
        it(`calls DomSource with useCapture true`, ({ ok, equal }, done) => {
          const eventType = 'click'
          const domSource = {
            events(type: string, options: EventListenerOptions) {
              equal(eventType, type)
              ok(!!options.capture)
              done()
            },
          } as DomSource

          const dom = useCapture(domSource)

          dom.events(eventType)
        }),
      ]),
    ]),
  ]),
])
