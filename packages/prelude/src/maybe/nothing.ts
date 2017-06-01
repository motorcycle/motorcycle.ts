import { Maybe } from './'

export interface Nothing { '@@167/Nothing': true }

const NOTHING: Nothing = { '@@167/Nothing': true }

export const nothing = () => NOTHING

export function isNothing<A>(maybe: Maybe<A>): maybe is Nothing {
  return (maybe as Nothing)['@@167/Nothing']
}
