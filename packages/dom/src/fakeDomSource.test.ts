import { Test, describe, given, it } from '@typed/test'

import { collectEventsFor } from '@motorcycle/test'
import { fakeDomSource } from './fakeDomSource'
import { now } from '@motorcycle/stream'

export const test: Test = describe(`fakeDomSource`, [
  given(`a FakeConfig`, [
    it(`returns a DomSource`, ({ equal }) => {
      const domSource = fakeDomSource<number, number>({ elements: now([1]), click: now(1) })

      return Promise.all([
        collectEventsFor(1, domSource.elements()).then(equal([[1]])),
        collectEventsFor(1, domSource.events('click')).then(equal([1])),
      ])
    }),
  ]),
])
