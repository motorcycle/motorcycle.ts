import { Test, describe, given, it } from '@typed/test'

import { HtmlDomSource } from './HtmlDomSource'
import { collectEventsFor } from '@motorcycle/test'

export const test: Test = describe(`HtmlDomSource`, [
  given(`an array of css selectors`, [
    it(`returns a DomSource`, ({ equal }) => {
      const { query, elements, events, cssSelectors } = new HtmlDomSource([])
      const isFunction = equal(`function`)

      isFunction(typeof query)
      isFunction(typeof elements)
      isFunction(typeof events)
      isFunction(typeof cssSelectors)
    }),
  ]),

  describe(`query`, [
    given(`a CSS selector`, [
      it(`appends it to a list of CSS selectors`, ({ equal }) => {
        const existingSelector = `.foo`
        const sut = new HtmlDomSource([existingSelector])
        const querySelector = `.bar`
        const cssSelectors = sut.query(querySelector).cssSelectors()

        equal(existingSelector, cssSelectors[0])
        equal(querySelector, cssSelectors[1])
      }),
    ]),

    given(`':root' as CSS selector`, [
      it(`does not append to the list of CSS selectors`, ({ equal }) => {
        const existingSelector = `.bar`
        const sut = new HtmlDomSource([existingSelector])
        const querySelector = `:root`
        const cssSelectors = sut.query(querySelector).cssSelectors()

        equal(1, cssSelectors.length)
        equal(existingSelector, cssSelectors[0])
      }),
    ]),
  ]),

  describe(`elements`, [
    it(`returns a stream that ends without events`, ({ equal }) => {
      const sut = new HtmlDomSource([])

      return collectEventsFor(Infinity, sut.elements()).then(equal([]))
    }),
  ]),

  describe(`events`, [
    it(`returns a stream that ends without events`, ({ equal }) => {
      const sut = new HtmlDomSource([])

      return collectEventsFor(Infinity, sut.events()).then(equal([]))
    }),
  ]),
])
