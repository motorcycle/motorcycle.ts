import { Test, describe, given, it } from '@typed/test'

import { DomSource } from './types'
import { createDomSource } from './createDomSource'
import { now } from '@motorcycle/stream'

export const test: Test = describe(`createDomSource`, [
  given(`a stream of elements`, [
    it(`returns a DomSource`, ({ equal }) => {
      const element = document.createElement('div')
      const dom: DomSource = createDomSource(now(element))

      equal('function', typeof dom.events)
      equal('function', typeof dom.elements)
      equal('function', typeof dom.cssSelectors)
      equal('function', typeof dom.query)
    }),
  ]),
])
