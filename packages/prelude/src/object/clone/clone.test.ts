// tslint:disable:no-magic-numbers
import { eq, where } from '@briancavalier/assert'
import { Test, describe, given, it } from '@typed/test'

import { clone } from './clone'

const notEq = where(<A>(a: A, b: A) => a !== b)

export const test: Test = describe(
  'clone',
  given(
    'an object',
    it('returns a cloned object', () => {
      const obj = {
        a: {
          b: {
            c: {
              d: 1,
              e: {
                f: 2,
              },
            },
          },
        },
      }

      const clonedObj = clone(obj)

      eq(clonedObj, obj)
      notEq(obj.a, clonedObj.a)
      notEq(obj.a.b, clonedObj.a.b)
      notEq(obj.a.b.c, clonedObj.a.b.c)
      notEq(obj.a.b.c.e, clonedObj.a.b.c.e)
    })
  ),
  given(
    'an array',
    it('returns a cloned array', () => {
      const array = [[1, 2], [2, 3], [[4, 5]]]

      const clonedArray = clone(array)

      eq(array, clonedArray)
      notEq(array[0], clonedArray[0])
      notEq(array[1], clonedArray[1])
      notEq(array[2], clonedArray[2])
      notEq(array[2][0], clonedArray[2][0])
    })
  )
)
