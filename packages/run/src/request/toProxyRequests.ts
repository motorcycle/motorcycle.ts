import { EndSignal, ProxyRequests, Requests } from '..'
import { ProxyStream, createProxy, until } from '@motorcycle/stream'

export interface toProxyRequestFn {
  <TRequests extends Requests>(
    t: Record<keyof TRequests, ProxyStream<any>>,
    e: EndSignal
  ): TRequests
}

export const toProxyRequests: toProxyRequestFn = function<TRequests extends Requests>(
  target: ProxyRequests<TRequests>,
  e: EndSignal
): TRequests {
  return new Proxy<TRequests>(target, {
    get(target: TRequests, k: keyof TRequests) {
      if (!target[k]) {
        const { stream } = createProxy<any>()

        target[k] = stream
      }

      return until(e, target[k])
    },
  })
}
