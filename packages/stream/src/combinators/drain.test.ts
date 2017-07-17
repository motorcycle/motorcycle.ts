import { Test, describe, given, it } from '@typed/test'

import { drain } from './drain'
import { empty } from '@most/core'

export const test: Test = describe(`drain`, [
  given(`a stream`, [
    it(`returns a promise`, ({ equal }) => {
      return drain(empty()).then(() => equal(1, 1))
    }),
  ]),
])
