import { Test, describe, given, it } from '@typed/test'

import { disposeResponse } from './disposeResponse'

export const test: Test = describe(`disposeResponse`, [
  given(`given Response properties with a dispose method`, [
    it(`calls the property's dispose method`, ({ equal }) => {
      let called = 0

      const prop = {
        dispose() {
          ++called
        },
      }

      const response = { prop }

      disposeResponse(response)

      equal(1, called)
    }),
  ]),
])
