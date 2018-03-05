import { FakeDom, fakeDomFrom } from './fakeDomFrom'
import { Test, describe, given, it } from '@typed/test'

import { collectEventsFor } from '@motorcycle/test'
import { now } from '@motorcycle/stream'

export const test: Test = describe(`fakeDomFrom`, [
  given(`a FakeConfig`, [
    it(`returns a FakeDom`, ({ equal }) => {
      const dom: FakeDom<number, number> = fakeDomFrom<number, number>({
        elements: now([1]),
        click: now(1),
      })

      return Promise.all([
        collectEventsFor(1, dom.elements()).then(equal([[1]])),
        collectEventsFor(1, dom.event('click')).then(equal([1])),
      ])
    }),
  ]),
])
