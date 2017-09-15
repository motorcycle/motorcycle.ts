import { Test, describe, given, it } from '@typed/test'

import { DomSinks } from '@motorcycle/mostly-dom'
import { Html } from './Html'
import { HtmlSources } from './types'
import { UI } from '../../../examples/counter/src/UI'
import { observe } from '@motorcycle/stream'
import { run } from '@motorcycle/test'

export const test: Test = describe(`Html`, [
  given(`Stream of VNode`, [
    it(`returns a Stream of HTML`, ({ equal }) => {
      const { sources, tick } = run<HtmlSources, DomSinks>(UI, Html)
      const { html$ } = sources

      const expectedHtml = `<div><h1>Count: 0</h1><button id="increment">Increment +</button><button id="decrement">Decrement -</button></div>`

      tick(Infinity)

      return observe(equal(expectedHtml), html$)
    }),
  ]),
])
