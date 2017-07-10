import { Stream } from '@most/types'

export type Component<
  Sources extends { readonly [key: string]: any },
  Sinks extends { readonly [key: string]: Stream<any> }
> = (sources: Sources) => Sinks
