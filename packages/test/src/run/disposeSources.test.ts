import { Test, describe, given, it } from '@typed/test'

import { disposeSources } from './disposeSources'

export const test: Test = describe(`disposeSources`, [
  given(`given Sources with a dispose method`, [
    it(`calls the Source's dispose method`, ({ equal }) => {
      let called = 0

      const source = {
        dispose() {
          ++called
        },
      }

      const sources = { source }

      disposeSources(sources)

      equal(1, called)
    }),
  ]),
])
