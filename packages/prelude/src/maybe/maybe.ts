import { Just, fromJust, isJust } from './just'
import { Nothing, isNothing } from './nothing'

import { curry2 } from '../function/curry/curry2'

export type Maybe<A> = Nothing | Just<A>

export const isMaybe = <A>(x: any): x is Maybe<A> => isJust(x) || isNothing<A>(x)

export const fromMaybe: FromMaybe = curry2(_fromMaybe)

export interface FromMaybe {
  <A>(defaultValue: A, maybe: Maybe<A>): A
  <A>(defaultValue: A): (maybe: Maybe<A>) => A
}

function _fromMaybe<A>(defaultValue: A, maybe: Maybe<A>): A {
  return isNothing<A>(maybe) ? defaultValue : fromJust<A>(maybe)
}
