import { CssSelector, DomSource } from '../'
import { Test, describe, given, it } from '@typed/test'
import { empty, mergeArray, now } from '@motorcycle/stream'

import { EventDelegationDomSource } from './'
import { collectEventsFor } from '@motorcycle/test'
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

  describe(`elements`, [
    given(`a DomSource with a stream of element and empty CSS selectors`, [
      it(`returns a stream of elements with only the root element`, ({ equal }) => {
        const rootEl = document.createElement('div')
        const sut: DomSource = new EventDelegationDomSource(now(rootEl), [])
        const elements$ = sut.elements()

        return collectEventsFor(1, elements$).then(equal([[rootEl]]))
      }),
    ]),

    given(`a DomSource with a stream of element with queried CSS selectors`, [
      it(`returns a stream of elements with only the most specific elements`, ({ equal }) => {
        const rootEl = document.createElement('div')
        const childEl = document.createElement('div')

        rootEl.classList.add(`foo`)
        childEl.classList.add(`foo`)
        rootEl.appendChild(childEl)

        const sut: DomSource = new EventDelegationDomSource(now(rootEl), [`.foo`])
        const elements$ = sut.elements()

        return collectEventsFor(1, elements$).then(equal([[rootEl, childEl]]))
      }),
    ]),

    given(`a DomSource with a stream of element with children matching CSS selectors`, [
      it(`returns a stream of elements with only the most specific elements`, ({ equal }) => {
        const rootEl = document.createElement('div')
        const childEl = document.createElement('div')

        childEl.classList.add(`foo`)
        rootEl.appendChild(childEl)

        const sut: DomSource = new EventDelegationDomSource(now(rootEl), [`.foo`])
        const elements$ = sut.elements()

        return collectEventsFor(1, elements$).then(equal([[childEl]]))
      }),
    ]),

    given(`a DomSource with a stream of element with non-matching CSS selectors`, [
      it(`returns a stream of elements with only the most specific elements`, ({ equal }) => {
        const rootEl = document.createElement('div')
        const childEl = document.createElement('div')

        childEl.classList.add(`foo`)
        rootEl.appendChild(childEl)

        const sut: DomSource = new EventDelegationDomSource(now(rootEl), [`.bar`])
        const elements$ = sut.elements()

        return collectEventsFor(1, elements$).then(equal([]))
      }),
    ]),

    given(`a DomSource with a repeating stream of element of matching CSS selectors`, [
      it(`returns a repeating stream of elements`, ({ equal }) => {
        const rootEl = document.createElement('div')
        const childEl = document.createElement('div')

        childEl.classList.add(`foo`)
        rootEl.appendChild(childEl)

        const sut: DomSource = new EventDelegationDomSource(
          mergeArray([now(rootEl), now(rootEl)]),
          [`.foo`]
        )
        const elements$ = sut.elements()

        return collectEventsFor(1, elements$).then(equal([[childEl], [childEl]]))
      }),
    ]),
  ]),
])
