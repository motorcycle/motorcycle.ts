import { Stream } from '@most/types'

/**
 * Component function type signature
 * @name Component
 * @example
 * export type Component<
 *   Sources extends { readonly [key: string]: any },
 *   Sinks extends { readonly [key: string]: Stream<any> }
 * > = (sources: Sources) => Sinks
 * @type true
 */
export type Component<
  Sources extends { readonly [key: string]: any },
  Sinks extends { readonly [key: string]: Stream<any> }
> = (sources: Sources) => Sinks
