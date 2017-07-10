import { Stream } from '@most/types'

export type EffectfulComponent<
  Sinks extends { readonly [key: string]: Stream<any> },
  Sources extends { readonly [key: string]: any }
> = (sinks: Sinks) => Sources
