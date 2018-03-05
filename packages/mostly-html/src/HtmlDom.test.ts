import { Test, describe, given, it } from '@typed/test'

import { HtmlDom } from './HtmlDom'
import { collectEventsFor } from '@motorcycle/test'

export const test: Test = describe(`HtmlDom`, [
  given(`an array of CSS selectors`, [
    it(`returns a Dom`, ({ equal }) => {
      const { query, elements, event, cssSelectors } = new HtmlDom([])
      const isFunction = equal(`function`)

      isFunction(typeof query)
      isFunction(typeof elements)
      isFunction(typeof event)
      isFunction(typeof cssSelectors)
    }),
  ]),

  describe(`query`, [
    given(`a CSS selector`, [
      it(`appends it to a list of CSS selectors`, ({ equal }) => {
        const existingSelector = `.foo`
        const sut = new HtmlDom([existingSelector])
        const querySelector = `.bar`
        const cssSelectors = sut.query(querySelector).cssSelectors()

        equal(existingSelector, cssSelectors[0])
        equal(querySelector, cssSelectors[1])
      }),
    ]),

    given(`':root' as CSS selector`, [
      it(`does not append to the list of CSS selectors`, ({ equal }) => {
        const existingSelector = `.bar`
        const sut = new HtmlDom([existingSelector])
        const querySelector = `:root`
        const cssSelectors = sut.query(querySelector).cssSelectors()

        equal(1, cssSelectors.length)
        equal(existingSelector, cssSelectors[0])
      }),
    ]),
  ]),

  describe(`elements`, [
    it(`returns a stream that ends without events`, ({ equal }) => {
      const sut = new HtmlDom([])

      return collectEventsFor(Infinity, sut.elements()).then(equal([]))
    }),
  ]),

  describe(`events`, [
    it(`returns a stream that ends without events`, ({ equal }) => {
      const sut = new HtmlDom([])

      return collectEventsFor(Infinity, sut.event()).then(equal([]))
    }),
  ]),
])
