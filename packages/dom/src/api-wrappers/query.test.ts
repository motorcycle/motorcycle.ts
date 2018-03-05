import { Query, query } from './'
import { Test, describe, given, it } from '@typed/test'

import { Dom } from '../'
import { EventDelegationDom } from '../Doms'
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
      const domSource: Dom = new EventDelegationDom(empty(), [existingSelector])
      const sut: Dom = query(querySelector, domSource)
      const queriedDomSource = domSource.query(querySelector)

      equal(queriedDomSource.cssSelectors(), sut.cssSelectors())
    }),
  ]),

  it(`is curried`, ({ equal }) => {
    const existingSelector = `.foo`
    const domSource: Dom = new EventDelegationDom(empty(), [existingSelector])
    const querySelector = `.bar`
    const sut: Dom = query(querySelector)(domSource)
    const queriedDomSource = domSource.query(querySelector)

    equal(queriedDomSource.cssSelectors(), sut.cssSelectors())
  }),
])
