import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { contains } from '../contains'
import { partition } from './partition'

export const test: Test = describe('partition',
  given('(a -> boolean) -> [a]',
    it('-> [ [a], [a] ]', () => {
      const actual = partition<string>(contains('s'), [ 'sss', 'ttt', 'foo', 'bars' ])
      const expected = [ [ 'sss', 'bars' ], [ 'ttt', 'foo' ] ]

      eq<ReadonlyArray<ReadonlyArray<string>>>(actual, expected)
    })
  )
)
