import { Test, describe, given, it } from '@typed/test'
import { empty, now } from '@motorcycle/stream'

import { collectEventsFor } from '@motorcycle/test'
import { createDomSource } from '@motorcycle/dom'
import { div } from 'mostly-dom'
import { isolate } from './'

export const test: Test = describe(`isolate`, [
  given(`a component and an isolation key`, [
    it(`returns an isolated component`, ({ equal }) => {
      const component = function(sources: Readonly<Record<string, any>>) {
        const {} = sources

        return {
          view$: now(div(`.bar`)),
        }
      }

      const isolationKey = `foo`
      const sut = isolate(component, isolationKey)
      const dom = createDomSource(empty())
      const { view$ } = sut({ dom })

      equal(`function`, typeof sut)

      return collectEventsFor(1, view$).then(view => {
        const { props: { className } } = view[0]

        equal(`bar $$isolation$$-foo`, className)
      })
    }),
  ]),
])
