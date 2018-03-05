import { DomRequests, DomResponses, button, div, h1 } from '@motorcycle/mostly-dom'
import { HtmlResponses, html } from './html'
import { Test, describe, given, it } from '@typed/test'
import { constant, map, merge, observe, scan } from '@motorcycle/stream'
import { event, query } from '@motorcycle/dom'

import { run } from '@motorcycle/test'

export const test: Test = describe(`Html`, [
  given(`Stream of VNode`, [
    it(`returns a Stream of HTML`, ({ equal }) => {
      const { sources: { html$ }, tick } = run<HtmlResponses, DomRequests>(main, html)
      const expectedHtml = `<div><h1>Count: 0</h1><button id="increment">Increment +</button><button id="decrement">Decrement -</button></div>`
      tick(Infinity)

      return observe(equal(expectedHtml), html$)
    }),
  ]),
])

const click = event('click')
const INCREMENT_ID = 'increment'
const DECREMENT_ID = 'decrement'
const INCREMENT_SELECTOR = `#${INCREMENT_ID}`
const DECREMENT_SELECTOR = `#${DECREMENT_ID}`

const add = (x: number, y: number) => x + y

function main({ dom }: DomResponses): DomRequests {
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
