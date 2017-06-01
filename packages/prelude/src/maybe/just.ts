import { Maybe } from './'

export interface Just<A> { readonly '@@167/Just': A }

export const just = <A>(value: A): Just<typeof value> => ({ ['@@167/Just']: value })

export function isJust<A>(maybe: Maybe<A>): maybe is Just<A> {
  return maybe.hasOwnProperty('@@167/Just')
}

// tslint:disable-next-line:no-shadowed-variable
export const fromJust = <A>(just: Just<A>): A => just['@@167/Just']
