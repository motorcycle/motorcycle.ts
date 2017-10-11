import { Stream } from '@most/types'

/**
 * An IO Component function signature.
 *
 * @name IOComponent
 * @example
 * export type IOComponent<
 *   Sinks extends { readonly [key: string]: Stream<any> },
 *   Sources extends { readonly [key: string]: any }
 * > = (sinks: Sinks) => Sources
 * @type
 */
export type IOComponent<
  Sinks extends { readonly [key: string]: Stream<any> },
  Sources extends { readonly [key: string]: any }
> = (sinks: Sinks) => Sources
