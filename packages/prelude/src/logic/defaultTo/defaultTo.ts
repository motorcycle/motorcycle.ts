import { curry2 } from '../../function/curry/curry2'

export const defaultTo: DefaultTo = curry2(_defaultTo)

function _defaultTo<A>(defaultValue: A, possibleValue: A | void | null): A {
  return !!possibleValue ? possibleValue : defaultValue
}

export interface DefaultTo {
  <A>(defaultValue: A, possibleValue: A | void | null): A
  <A>(defaultValue: A): (possibleValue: A | void | null) => A
}
