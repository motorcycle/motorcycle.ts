import { CssSelector, DomSource, StandardEvents } from '../'
import { Test, describe, given, it } from '@typed/test'
import { drain, empty, mergeArray, now, take } from '@motorcycle/stream'

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

  describe(`events`, [
    given(`an event type`, [
      it(`returns a stream of events of same event type`, ({ equal }, done) => {
        const rootEl = document.createElement('div')
        const sut: DomSource = new EventDelegationDomSource(now(rootEl), [])
        const eventType = 'click'
        const event$ = sut.events(eventType)
        const event = new Event(eventType)

        collectEventsFor(1, event$).then(equal([event, event])).then(() => done()).catch(done)

        setTimeout(() => {
          rootEl.dispatchEvent(event)
          rootEl.dispatchEvent(event)
        })
      }),

      it(`calls element.addEventListener only once for an event type`, ({ equal }) => {
        const rootEl = document.createElement('div')
        let called = 0

        rootEl.addEventListener = () => {
          ++called
        }

        const sut: DomSource = new EventDelegationDomSource(now(rootEl), [])
        const eventType = 'click'

        drain(sut.events(eventType))
        drain(sut.events(eventType))
        drain(sut.events(eventType))

        return drain(sut.elements()).then(() => equal(1, called))
      }),

      it(`calls element.removeEventListener when stream ends`, ({ equal }) => {
        const rootEl = document.createElement('div')
        let called = 0

        rootEl.removeEventListener = () => {
          ++called
        }

        const sut: DomSource = new EventDelegationDomSource(now(rootEl), [])
        const eventType = 'click'
        const event = new Event(eventType)

        setTimeout(() => rootEl.dispatchEvent(event))

        return drain(take(1, sut.events(eventType))).then(() => equal(1, called))
      }),

      it(`returns stream of events from multiple elements`, ({ equal }, done) => {
        const rootEl = document.createElement('div')
        const firstChildEl = document.createElement('div')
        const secondChildEl = document.createElement('div')

        rootEl.appendChild(firstChildEl)
        rootEl.appendChild(secondChildEl)

        const sut: DomSource = new EventDelegationDomSource(now(rootEl), [])
        const eventType = 'click'
        const event$ = sut.events(eventType)
        const event = new Event(eventType, { bubbles: true })

        collectEventsFor(1, event$)
          .then(equal([event, event, event]))
          .then(() => done())
          .catch(done)

        setTimeout(() => {
          rootEl.dispatchEvent(event)
          firstChildEl.dispatchEvent(event)
          secondChildEl.dispatchEvent(event)
        })
      }),
    ]),

    given(`an event type and event options`, [
      it(`calls element.addEventListener with event options`, ({ equal }, done) => {
        const rootEl: Element = document.createElement('div')
        const eventOptions: EventListenerOptions = { capture: true }

        rootEl.addEventListener = (
          _: StandardEvents,
          __?: EventListenerOrEventListenerObject,
          useCapture?: boolean
        ) => {
          equal(eventOptions.capture, useCapture)
          done()
        }

        const sut: DomSource = new EventDelegationDomSource(now(rootEl), [])
        const eventType = 'click'

        drain(sut.events(eventType, eventOptions))
      }),

      it(`calls element.removeEventListener with event options`, ({ equal }, done) => {
        const rootEl: Element = document.createElement('div')
        const eventOptions: EventListenerOptions = { capture: true }

        rootEl.removeEventListener = (
          _: StandardEvents,
          __?: EventListenerOrEventListenerObject,
          useCapture?: boolean
        ) => {
          equal(eventOptions.capture, useCapture)
          done()
        }

        const sut: DomSource = new EventDelegationDomSource(now(rootEl), [])
        const eventType = 'click'
        const event = new Event(eventType)

        setTimeout(() => rootEl.dispatchEvent(event))

        drain(take(1, sut.events(eventType, eventOptions)))
      }),

      it(`sets correct currentTarget when capturing non-bubbling events`, ({ equal }, done) => {
        const rootEl = document.createElement('div')
        const form = document.createElement('form')
        const input = document.createElement('input')

        form.appendChild(input)
        rootEl.appendChild(form)

        const sut: DomSource = new EventDelegationDomSource(now(rootEl), ['form'])

        const eventType = 'reset'

        collectEventsFor(1, sut.events(eventType, { capture: true }))
          .then(([event]) => {
            equal(form, event.currentTarget)
            done()
          })
          .catch(done)

        setTimeout(() => {
          form.dispatchEvent(new Event(eventType, { bubbles: false }))
        })
      }),
    ]),
  ]),
])
