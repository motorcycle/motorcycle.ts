import { Keyed } from './types'
import { curry } from '167'

export const keyed: Keyed = curry(function keyed<A>(keys: { [key: string]: A }, key: string): A {
  return keys[key]
})
