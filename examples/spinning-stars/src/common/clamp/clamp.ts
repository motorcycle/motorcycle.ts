import { greaterThan, lessThan } from '@typed/logic'

import { ClampArity3 } from './types'
import { curry3 } from '@typed/functions'

export const clamp: ClampArity3 = curry3(function limit<A>(min: A, max: A, value: A): A {
  if (lessThan(min, value)) return min
  if (greaterThan(max, value)) return max

  return value
})
