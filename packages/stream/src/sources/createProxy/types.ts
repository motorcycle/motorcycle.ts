import { ProxyStream } from './ProxyStream'
import { Stream } from '@motorcycle/types'

export interface Proxy<A> {
  readonly attach: (stream: Stream<A>) => Stream<A>
  readonly stream: ProxyStream<A>
}
