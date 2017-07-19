import { Stream } from '@most/types'

/**
 * An Effectful Component function signature.
 * 
 * @name EffectfulComponent
 * @example
 * export type EffectfulComponent<
 *   Sinks extends { readonly [key: string]: Stream<any> },
 *   Sources extends { readonly [key: string]: any }
 * > = (sinks: Sinks) => Sources
 * @type
 */
export type EffectfulComponent<
  Sinks extends { readonly [key: string]: Stream<any> },
  Sources extends { readonly [key: string]: any }
> = (sinks: Sinks) => Sources
