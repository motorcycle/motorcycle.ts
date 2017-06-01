import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { mapAccum } from './mapAccum'

export const test: Test = describe('mapAccum',
  given('(b -> a -> [b, c]) -> b -> [a]' ,
    it('-> [ b, [c] ]', () => {
      const digits = [ '1', '2', '3', '4' ]
      const appender = (a: string, b: string) => [ a + b, a + b ] as [ string, string ]

      eq<[ string, ReadonlyArray<string> ]>(mapAccum(appender, '0', digits), [ '01234', [ '01', '012', '0123', '01234' ] ])
    })
  )
)
