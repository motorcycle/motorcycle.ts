import { CssSelector, DomSource } from '../'
import { Test, describe, given, it } from '@typed/test'

import { EventDelegationDomSource } from './'
import { empty } from '@motorcycle/stream'
import { length } from '167'

export const test: Test = describe(`EventDelegationDomSource`, [
  given(`a stream of element and a CSS selectors`, [
    it(`returns a DomSource`, ({ equal }) => {
      const { query, elements, events, cssSelectors }: DomSource = new EventDelegationDomSource(
        empty(),
        []
      )
      const isFunction = equal(`function`)

      isFunction(typeof query)
      isFunction(typeof elements)
      isFunction(typeof events)
      isFunction(typeof cssSelectors)
    }),
  ]),
])

export const methodsTest: Test = describe(`EventDelegationDomSource methods`, [
  describe(`query`, [
    given(`a CSS selector`, [
      it(`appends it to a list of CSS selectors`, ({ equal }) => {
        const existingSelector = `.foo`
        const sut: DomSource = new EventDelegationDomSource(empty(), [existingSelector])
        const querySelector = `.bar`
        const cssSelectors: ReadonlyArray<CssSelector> = sut.query(querySelector).cssSelectors()

        equal(existingSelector, cssSelectors[0])
        equal(querySelector, cssSelectors[1])
      }),
    ]),

    given(`':root' as CSS selector`, [
      it(`does not append to the list of CSS selectors`, ({ equal }) => {
        const existingSelector = `.bar`
        const sut: DomSource = new EventDelegationDomSource(empty(), [existingSelector])
        const querySelector = `:root`
        const cssSelectors: ReadonlyArray<CssSelector> = sut.query(querySelector).cssSelectors()

        equal(1, length(cssSelectors))
        equal(existingSelector, cssSelectors[0])
      }),
    ]),
  ]),
])
