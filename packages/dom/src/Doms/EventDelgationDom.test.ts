import { CssSelector, Dom, StandardEventTypes } from '../'
import { Test, describe, given, it } from '@typed/test'
import { drain, empty, mergeArray, now, observe, take } from '@motorcycle/stream'

import { EventDelegationDom } from './EventDelegationDom'
import { collectEventsFor } from '@motorcycle/test'
import { length } from '@typed/list'
import { pipe } from '@typed/functions'

export const test: Test = describe(`EventDelegationDom`, [
  given(`a stream of element and CSS selectors`, [
    it(`returns a Dom`, ({ equal }) => {
      const { query, elements, event, cssSelectors }: Dom = new EventDelegationDom(empty(), [])
      const isFunction = equal(`function`)

      isFunction(typeof query)
      isFunction(typeof elements)
      isFunction(typeof event)
      isFunction(typeof cssSelectors)
    }),
  ]),
])

export const methodsTest: Test = describe(`EventDelegationDom methods`, [
  describe(`query`, [
    given(`a CSS selector`, [
      it(`appends it to a list of CSS selectors`, ({ equal }) => {
        const existingSelector = `.foo`
        const sut: Dom = new EventDelegationDom(empty(), [existingSelector])
        const querySelector = `.bar`
        const cssSelectors: ReadonlyArray<CssSelector> = sut.query(querySelector).cssSelectors()

        equal(existingSelector, cssSelectors[0])
        equal(querySelector, cssSelectors[1])
      }),
    ]),

    given(`':root' as CSS selector`, [
      it(`does not append to the list of CSS selectors`, ({ equal }) => {
        const existingSelector = `.bar`
        const sut: Dom = new EventDelegationDom(empty(), [existingSelector])
        const querySelector = `:root`
        const cssSelectors: ReadonlyArray<CssSelector> = sut.query(querySelector).cssSelectors()

        equal(1, length(cssSelectors))
        equal(existingSelector, cssSelectors[0])
      }),
    ]),
  ]),

  describe(`elements`, [
    given(`a Dom with a stream of element and empty CSS selectors`, [
      it(`returns a stream of elements with only the root element`, ({ equal }) => {
        const rootEl = document.createElement('div')
        const sut: Dom = new EventDelegationDom(now(rootEl), [])
        const elements$ = sut.elements()

        return collectEventsFor(1, elements$).then(equal([[rootEl]]))
      }),
    ]),

    given(`a Dom with a stream of element with queried CSS selectors`, [
      it(`returns a stream of elements with only the most specific elements`, ({ equal }) => {
        const rootEl = document.createElement('div')
        const childEl = document.createElement('div')

        rootEl.classList.add(`foo`)
        childEl.classList.add(`foo`)
        rootEl.appendChild(childEl)

        const sut: Dom = new EventDelegationDom(now(rootEl), [`.foo`])
        const elements$ = sut.elements()

        return collectEventsFor(1, elements$).then(equal([[rootEl, childEl]]))
      }),
    ]),

    given(`a Dom with a stream of element with children matching CSS selectors`, [
      it(`returns a stream of elements with only the most specific elements`, ({ equal }) => {
        const rootEl = document.createElement('div')
        const childEl = document.createElement('div')

        childEl.classList.add(`foo`)
        rootEl.appendChild(childEl)

        const sut: Dom = new EventDelegationDom(now(rootEl), [`.foo`])
        const elements$ = sut.elements()

        return collectEventsFor(1, elements$).then(equal([[childEl]]))
      }),
    ]),

    given(`a Dom with a stream of element with non-matching CSS selectors`, [
      it(`returns a stream of elements with only the most specific elements`, ({ equal }) => {
        const rootEl = document.createElement('div')
        const childEl = document.createElement('div')

        childEl.classList.add(`foo`)
        rootEl.appendChild(childEl)

        const sut: Dom = new EventDelegationDom(now(rootEl), [`.bar`])
        const elements$ = sut.elements()

        return collectEventsFor(1, elements$).then(equal([]))
      }),
    ]),

    given(`a Dom with a repeating stream of element of matching CSS selectors`, [
      it(`returns a repeating stream of elements`, ({ equal }) => {
        const rootEl = document.createElement('div')
        const childEl = document.createElement('div')

        childEl.classList.add(`foo`)
        rootEl.appendChild(childEl)

        const sut: Dom = new EventDelegationDom(mergeArray([now(rootEl), now(rootEl)]), [`.foo`])
        const elements$ = sut.elements()

        return collectEventsFor(1, elements$).then(equal([[childEl], [childEl]]))
      }),
    ]),
  ]),

  describe(`event`, [
    given(`an event type`, [
      it(`returns a stream of events of same event type`, ({ equal }, done) => {
        const rootEl = document.createElement('div')
        const sut: Dom = new EventDelegationDom(now(rootEl), [])
        const eventType = 'click'
        const event$ = sut.event(eventType)
        const event = new Event(eventType)

        collectEventsFor(1, event$)
          .then(equal([event, event]))
          .then(() => done())
          .catch(done)

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

        const sut: Dom = new EventDelegationDom(now(rootEl), [])
        const eventType = 'click'

        drain(sut.event(eventType))
        drain(sut.event(eventType))
        drain(sut.event(eventType))

        return drain(sut.elements()).then(() => equal(1, called))
      }),

      it(`calls element.removeEventListener when stream ends`, ({ equal }) => {
        const rootEl = document.createElement('div')
        let called = 0

        rootEl.removeEventListener = () => {
          ++called
        }

        const sut: Dom = new EventDelegationDom(now(rootEl), [])
        const eventType = 'click'
        const event = new Event(eventType)

        setTimeout(() => rootEl.dispatchEvent(event))

        return drain(take(1, sut.event(eventType))).then(() => equal(1, called))
      }),

      it(`does not emit events to incorrect listener`, ({ ok }, done) => {
        const rootEl = document.createElement('div')
        const firstChildEl = document.createElement('div')
        const secondChildEl = document.createElement('div')

        const className = 'foo'

        firstChildEl.className = className

        rootEl.appendChild(firstChildEl)
        rootEl.appendChild(secondChildEl)

        const sut: Dom = new EventDelegationDom(now(rootEl), [])
        const eventType = 'click'

        const event$ = sut.query(`.${className}`).event(eventType)
        const wrongEvent$ = sut.query(`:root`).event(eventType)

        observe(() => done(new Error('should not be called')), wrongEvent$)

        observe((ev: Event) => {
          ok((ev.target as HTMLDivElement).matches(`.${className}`))
          setTimeout(() => done())
        }, event$)

        setTimeout(() => {
          const event = new Event(eventType, { bubbles: true })

          firstChildEl.dispatchEvent(event)
        })
      }),

      it(`matches a single element with two classes`, ({ equal }, done) => {
        const root: Element = document.createElement('div')
        const child: Element = document.createElement('div')

        child.className = 'foo bar'
        root.appendChild(child)

        const sut: Dom = new EventDelegationDom(now(root), ['.foo', '.bar'])

        const event$ = sut.event('click')

        observe(event => equal('click', event.type), take(1, event$))
          .then(() => done())
          .catch(done)

        setTimeout(() => {
          child.dispatchEvent(new Event('click', { bubbles: true }))
        })
      }),
    ]),

    given(`an event type and event options`, [
      it(`returns stream of events from multiple elements with capture true`, ({ equal }, done) => {
        const rootEl = document.createElement('div')
        const firstChildEl = document.createElement('div')
        const secondChildEl = document.createElement('div')

        rootEl.appendChild(firstChildEl)
        rootEl.appendChild(secondChildEl)

        const sut: Dom = new EventDelegationDom(now(rootEl), [])
        const eventType = 'click'
        const event$ = sut.event(eventType, { capture: true })
        const event = new Event(eventType)

        collectEventsFor(1, event$)
          .then(pipe(length, equal(3)))
          .then(() => done())
          .catch(done)

        setTimeout(() => {
          rootEl.dispatchEvent(event)
          firstChildEl.dispatchEvent(event)
          secondChildEl.dispatchEvent(event)
        })
      }),

      it(`calls element.addEventListener with event options`, ({ equal }, done) => {
        const rootEl: Element = document.createElement('div')
        const eventOptions: EventListenerOptions = { capture: true }

        rootEl.addEventListener = (
          _: StandardEventTypes,
          __?: EventListenerOrEventListenerObject,
          useCapture?: boolean
        ) => {
          equal(eventOptions.capture, useCapture)
          done()
        }

        const sut: Dom = new EventDelegationDom(now(rootEl), [])
        const eventType = 'click'

        drain(sut.event(eventType, eventOptions))
      }),

      it(`calls element.removeEventListener with event options`, ({ equal }, done) => {
        const rootEl: Element = document.createElement('div')
        const eventOptions: EventListenerOptions = { capture: true }

        rootEl.removeEventListener = (
          _: StandardEventTypes,
          __?: EventListenerOrEventListenerObject,
          useCapture?: boolean
        ) => {
          equal(eventOptions.capture, useCapture)
          done()
        }

        const sut: Dom = new EventDelegationDom(now(rootEl), [])
        const eventType = 'click'
        const event = new Event(eventType)

        setTimeout(() => rootEl.dispatchEvent(event))

        drain(take(1, sut.event(eventType, eventOptions)))
      }),

      it(`sets correct currentTarget when capturing non-bubbling events`, ({ equal }, done) => {
        const rootEl = document.createElement('div')
        const form = document.createElement('form')
        const input = document.createElement('input')

        form.appendChild(input)
        rootEl.appendChild(form)

        const sut: Dom = new EventDelegationDom(now(rootEl), ['form'])

        const eventType = 'reset'

        collectEventsFor<Event>(1, sut.event(eventType, { capture: true }))
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
