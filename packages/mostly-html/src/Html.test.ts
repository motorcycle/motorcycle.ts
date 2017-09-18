import { DomSinks, DomSources, button, div, h1 } from '@motorcycle/mostly-dom'
import { Test, describe, given, it } from '@typed/test'
import { constant, map, merge, observe, scan } from '@motorcycle/stream'
import { events, query } from '@motorcycle/dom'

import { Html } from './Html'
import { HtmlSources } from './types'
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

const click = events('click')
const INCREMENT_ID = 'increment'
const DECREMENT_ID = 'decrement'
const INCREMENT_SELECTOR = `#${INCREMENT_ID}`
const DECREMENT_SELECTOR = `#${DECREMENT_ID}`

const add = (x: number, y: number) => x + y

function UI(sources: DomSources): DomSinks {
  const { dom } = sources
  const increment$ = constant(+1, click(query<Element>(INCREMENT_SELECTOR, dom)))
  const decrement$ = constant(-1, click(query<Element>(DECREMENT_SELECTOR, dom)))
  const amount$ = scan(add, 0, merge(increment$, decrement$))
  const view$ = map(view, amount$)

  return { view$ }
}

function view(amount: number) {
  return div([
    h1(`Count: ${amount}`),
    button({ id: INCREMENT_ID }, `Increment +`),
    button({ id: DECREMENT_ID }, `Decrement -`),
  ])
}
