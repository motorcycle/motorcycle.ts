import { Test, describe, given, it } from '@typed/test'

import { collectEventsFor } from '@motorcycle/test'
import { createElement } from 'react'
import { length } from '167'
import { makeDomComponent } from './makeDomComponent'
import { now } from '@motorcycle/stream'

export const test: Test = describe(`makeDomComponent`, [
  given(`an Element and DomSinks`, [
    it(`returns a DomSources`, ({ equal }) => {
      const element = document.createElement('div')
      const view$ = now(createElement('div'))

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
      const view$ = now(createElement('div', { className: 'foo' }))

      const Dom = makeDomComponent(element)

      const { dom } = Dom({ view$ })

      return collectEventsFor(Infinity, dom.elements()).then(([[element]]) => {
        equal(1, length(element.querySelectorAll('.foo')))
      })
    }),
  ]),
])
