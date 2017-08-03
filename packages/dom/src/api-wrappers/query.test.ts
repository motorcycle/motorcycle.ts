import { Query, query } from './'
import { Test, describe, given, it } from '@typed/test'

import { DomSource } from '../'
import { EventDelegationDomSource } from '../DomSources'
import { empty } from '@motorcycle/stream'

export const test: Test = describe(`query`, [
  it(`is a Query function`, ({ equal }) => {
    const sut: Query = query

    equal(`function`, typeof sut)
  }),

  given(`a CSS selector and a DOM source`, [
    it(`returns a DOM source equivalent to calling DomSource.query(cssSelector)`, ({ equal }) => {
      const existingSelector = `.foo`
      const querySelector = `.bar`
      const domSource: DomSource = new EventDelegationDomSource(empty(), [existingSelector])
      const sut: DomSource = query(querySelector, domSource)
      const queriedDomSource = domSource.query(querySelector)

      equal(queriedDomSource, sut)
    }),
  ]),

  it(`is curried`, ({ equal }) => {
    const existingSelector = `.foo`
    const domSource: DomSource = new EventDelegationDomSource(empty(), [existingSelector])
    const querySelector = `.bar`
    const sut: DomSource = query(querySelector)(domSource)
    const queriedDomSource = domSource.query(querySelector)

    equal(queriedDomSource, sut)
  }),
])
