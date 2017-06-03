// tslint:disable:no-magic-numbers
import { assert, eq } from '@briancavalier/assert'
import { Test, describe, it } from '@typed/test'

import { fromJust, isJust, isMaybe, isNothing, just, nothing } from './'

export const test: Test = describe(
  `Maybe`,
  describe(
    `Just`,
    describe(
      `just`,
      it(`creates a Just`, () => {
        assert(isJust(just(1)))
        eq(fromJust(just(1)), 1)
      })
    ),
    describe(
      `isJust`,
      it(`returns true given a Just`, () => {
        assert(isJust(just(1)))
      }),
      it(`returns false given a Nothing`, () => {
        assert(!isJust(nothing()))
      })
    ),
    describe(
      `fromJust`,
      it(`returns value of a Just`, () => {
        eq(fromJust(just(1)), 1)
        eq(fromJust(just(1)), 1)
        eq(fromJust(just(5)), 5)
        eq(fromJust(just(5)), 5)
      })
    )
  ),
  describe(
    `Nothing`,
    describe(
      `nothing`,
      it(`returns a Nothing`, () => {
        assert(isNothing(nothing()))
      })
    ),
    describe(
      `isNothing`,
      it(`returns true when given a Nothing`, () => {
        assert(isNothing(nothing()))
      }),
      it(`returns false when given a Just`, () => {
        assert(!isNothing(just(1)))
      })
    )
  ),
  describe(
    `Maybe`,
    describe(
      `isMaybe`,
      it(`returns true given a Just or Nothing`, () => {
        assert(isMaybe(just(1)))
        assert(isMaybe(nothing()))
      }),
      it(`returns false given anything else`, () => {
        assert(!isMaybe(1))
        assert(!isMaybe('hello'))
      })
    )
  )
)
