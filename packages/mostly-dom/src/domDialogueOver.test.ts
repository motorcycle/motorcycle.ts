import { Test, describe, given, it } from '@typed/test'

import { collectEventsFor } from '@motorcycle/test'
import { div } from 'mostly-dom'
import { domDialogueOver } from './domDialogueOver'
import { length } from '@typed/list'
import { now } from '@motorcycle/stream'

export const test: Test = describe(`domDialogueOver`, [
  given(`an Element and Stream<VNode>`, [
    it(`returns a Dom`, ({ equal }) => {
      const element = document.createElement('div')
      const view$ = now(div())

      const domDialogue = domDialogueOver(element)

      const { dom } = domDialogue({ view$ })

      const isFunction = equal(`function`)

      isFunction(typeof dom.query)
      isFunction(typeof dom.elements)
      isFunction(typeof dom.event)
      isFunction(typeof dom.cssSelectors)
    }),

    it(`patches the dom`, ({ equal }) => {
      const element = document.createElement('div')
      const view$ = now(div({ className: 'foo' }))

      const domDialogue = domDialogueOver(element)

      const { dom } = domDialogue({ view$ })

      return collectEventsFor(Infinity, dom.elements()).then(([[element]]) => {
        equal(1, length(element.querySelectorAll('.foo')))
      })
    }),
  ]),
])
