import { DomRequests, DomResponses, isolate } from './'
import { Test, describe, given, it } from '@typed/test'
import { empty, now } from '@motorcycle/stream'

import { Component } from '@motorcycle/types'
import { collectEventsFor } from '@motorcycle/test'
import { div } from 'mostly-dom'
import { eventDelegationDomFrom } from '@motorcycle/dom'

export const test: Test = describe(`isolate`, [
  given(`a component and an isolation key`, [
    it(`returns an isolated component`, ({ equal }) => {
      const component = () => ({
        view$: now(div({ className: `bar` })),
      })

      const isolationKey = `foo`
      const sut = isolate(component, isolationKey)
      const dom = eventDelegationDomFrom(empty())
      const { view$ } = sut({ dom })

      equal(`function`, typeof sut)

      return collectEventsFor(1, view$).then(view => {
        const { props: { className } } = view[0]

        equal(`bar __isolation__foo`, className)
      })
    }),

    it(`appends isolation key to Dom cssSelectors`, ({ equal }, done) => {
      const component = function(rs: DomResponses) {
        const { dom } = rs

        equal(['.__isolation__foo'], dom.cssSelectors())
        done()

        return {
          view$: now(div({ className: `bar` })),
        }
      }

      const isolationKey = `foo`
      const sut = isolate(component, isolationKey)
      const dom = eventDelegationDomFrom(empty())

      sut({ dom })
    }),
  ]),

  given(`a component`, [
    it(`returns a function that accepts an isolation key and returns an isolated component`, ({
      equal,
    }) => {
      const component = () => ({
        view$: now(div({ className: `bar` })),
      })

      const sut: <TResponses extends DomResponses, TRequests extends DomRequests>(
        k: string
      ) => Component<TResponses, TRequests> = isolate(component)

      equal(`function`, typeof sut)

      const isolatedComponent = sut(`foo`)
      const dom = eventDelegationDomFrom(empty())
      const { view$ } = isolatedComponent({ dom })

      equal('function', typeof isolatedComponent)

      return collectEventsFor(1, view$).then(view => {
        const { props: { className } } = view[0]

        equal(`bar __isolation__foo`, className)
      })
    }),
  ]),

  given(`a component, an isolation and DomResponses`, [
    it(`returns DomRequests from the isolated component`, ({ equal }) => {
      const component = () => ({
        view$: now(div({ className: `bar` })),
      })

      const rs: DomResponses = { dom: eventDelegationDomFrom(empty()) }
      const sut: DomRequests = isolate(component, `foo`, rs)
      const { view$ } = sut

      return collectEventsFor(1, view$).then(view => {
        const { props: { className } } = view[0]

        equal(`bar __isolation__foo`, className)
      })
    }),
  ]),
])
