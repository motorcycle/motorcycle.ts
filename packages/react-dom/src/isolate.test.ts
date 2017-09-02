import { Test, describe, given, it } from '@typed/test'
import { VNode, isolate } from './'
import { empty, now } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'
import { collectEventsFor } from '@motorcycle/test'
import { createDomSource } from '@motorcycle/dom'
import { createElement } from 'react'

export const test: Test = describe(`isolate`, [
  given(`a component and an isolation key`, [
    it(`returns an isolated component`, ({ equal }) => {
      const component = function(sources: Readonly<Record<string, any>>) {
        const {} = sources

        return {
          view$: now(createElement('div', { className: `bar` })),
        }
      }

      const isolationKey = `foo`
      const sut = isolate(component, isolationKey)
      const dom = createDomSource(empty())
      const { view$ } = sut({ dom })

      equal(`function`, typeof sut)

      return collectEventsFor(1000, view$ as Stream<VNode<{ className: string }>>).then(view => {
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
          view$: now(createElement('div', { className: `bar` })),
        }
      }

      const isolationKey = `foo`
      const sut = isolate(component, isolationKey)
      const dom = createDomSource(empty())

      sut({ dom })
    }),
  ]),
])
