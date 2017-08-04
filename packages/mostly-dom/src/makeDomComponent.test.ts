import { Test, describe, given, it } from '@typed/test'

import { collectEventsFor } from '@motorcycle/test'
import { div } from 'mostly-dom'
import { length } from '167'
import { makeDomComponent } from './makeDomComponent'
import { now } from '@motorcycle/stream'

export const test: Test = describe(`createDomSource`, [
  given(`an Element and Stream<VNode>`, [
    it(`returns a DomSource`, ({ equal }) => {
      const element = document.createElement('div')
      const view$ = now(div())

      const Dom = makeDomComponent(element)

      const { dom } = Dom({ view$ })

      const isFunction = equal(`function`)

      isFunction(typeof dom.query)
      isFunction(typeof dom.elements)
      isFunction(typeof dom.events)
      isFunction(typeof dom.cssSelectors)
    }),

    it(`patches the dom`, ({ equal }) => {
      const element = document.createElement('div')
      const view$ = now(div('.foo'))

      const Dom = makeDomComponent(element)

      const { dom } = Dom({ view$ })

      return collectEventsFor(1, dom.elements()).then(([[element]]) => {
        equal(1, length(element.querySelectorAll('.foo')))
      })
    }),
  ]),
])
