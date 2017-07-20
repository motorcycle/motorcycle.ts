import { ProxyStream, createProxy, until } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'

export function createProxySinks<Sinks extends { readonly [key: string]: Stream<any> }>(
  sinks: Record<keyof Sinks, ProxyStream<any>>,
  endSignal: Stream<void>
): Sinks {
  return new Proxy<Sinks>(sinks, {
    get(target: Sinks, property: keyof Sinks) {
      if (!target[property]) {
        const { stream } = createProxy<any>()

        target[property] = stream
      }

      return until(endSignal, target[property])
    },
  })
}
