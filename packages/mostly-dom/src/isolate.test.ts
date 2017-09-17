import { DomSinks, DomSources, isolate } from './'
import { Test, describe, given, it } from '@typed/test'
import { empty, now } from '@motorcycle/stream'

import { Component } from '@motorcycle/types'
import { collectEventsFor } from '@motorcycle/test'
import { createDomSource } from '@motorcycle/dom'
import { div } from 'mostly-dom'

export const test: Test = describe(`isolate`, [
  given(`a component and an isolation key`, [
    it(`returns an isolated component`, ({ equal }) => {
      const component = function(sources: Readonly<Record<string, any>>) {
        const {} = sources

        return {
          view$: now(div({ className: `bar` })),
        }
      }

      const isolationKey = `foo`
      const sut = isolate(component, isolationKey)
      const dom = createDomSource(empty())
      const { view$ } = sut({ dom })

      equal(`function`, typeof sut)

      return collectEventsFor(1, view$).then(view => {
        const { props: { className } } = view[0]

        equal(`bar __isolation__foo`, className)
      })
    }),

    it(`appends isolation key to DomSource cssSelectors`, ({ equal }, done) => {
      const component = function(sources: Readonly<Record<string, any>>) {
        const { dom } = sources

        equal(['.__isolation__foo'], dom.cssSelectors())
        done()

        return {
          view$: now(div({ className: `bar` })),
        }
      }

      const isolationKey = `foo`
      const sut = isolate(component, isolationKey)
      const dom = createDomSource(empty())

      sut({ dom })
    }),
  ]),

  given(`a component`, [
    it(`returns a function that accepts an isolation key and returns an isolated component`, ({
      equal,
    }) => {
      const component = function(sources: Readonly<Record<string, any>>) {
        const {} = sources

        return {
          view$: now(div({ className: `bar` })),
        }
      }

      const sut: <Sources extends DomSources, Sinks extends DomSinks>(
        key: string
      ) => Component<Sources, Sinks> = isolate(component)

      equal(`function`, typeof sut)

      const isolatedComponent = sut(`foo`)
      const dom = createDomSource(empty())
      const { view$ } = isolatedComponent({ dom })

      equal('function', typeof isolatedComponent)

      return collectEventsFor(1, view$).then(view => {
        const { props: { className } } = view[0]

        equal(`bar __isolation__foo`, className)
      })
    }),
  ]),
])
