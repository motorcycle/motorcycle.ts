import { Proxy } from './types'
import { ProxyStream } from './ProxyStream'
import { Stream } from '@motorcycle/types'

export function createProxy<A>(): Proxy<A> {
  const stream = new ProxyStream<A>()

  const attach = (origin: Stream<A>) => stream.attach(origin)

  return { attach, stream }
}
