import { eq } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { indexBy } from './indexBy'

type Student =
  {
    readonly name: string,
    readonly score: number,
  }

const students: Array<Student> =
  [
    { name: 'John', score: 85 },
    { name: 'Jane', score: 93 },
    { name: 'Abby', score: 95 },
    { name: 'Jack', score: 75 },
  ]

export const test: Test = describe('indexBy',
  given('(a -> string) and List a',
    it('returns an object indexed by keys', () => {
      const expected: any =
        {
          John: { name: 'John', score: 85 },
          Jane: { name: 'Jane', score: 93 },
          Abby: { name: 'Abby', score: 95 },
          Jack: { name: 'Jack', score: 75 },
        }

      const f = (s: Student) => s.name

      eq(indexBy(f, students), expected)
    })
  )
)
