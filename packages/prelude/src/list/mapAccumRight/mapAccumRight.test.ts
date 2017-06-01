import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { mapAccumRight } from './mapAccumRight'

export const test: Test = describe('mapAccumRight',
  given('(b -> a -> [b, c]) -> b -> [a]' ,
    it('-> [ b, [c] ]', () => {
      const digits = [ '1', '2', '3', '4' ]
      const appender = (a: string, b: string) => [ a + b, a + b ] as [ string, string ]

      eq<any>(mapAccumRight(appender, '5', digits), [ [ '12345', '2345', '345', '45' ], '12345' ])
    })
  )
)
