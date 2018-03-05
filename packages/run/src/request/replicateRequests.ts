import { Disposable, Requests } from '@motorcycle/types'

import { ProxyRequests } from '..'
import { disposeAll } from '@most/disposable'
import { scheduler } from '@motorcycle/stream'

export interface replicateRequestsFn {
  <TRequests extends Requests>(rs: TRequests, prs: ProxyRequests<TRequests>): Disposable
}

export const replicateRequests: replicateRequestsFn = function<TRequests extends Requests>(
  rs: TRequests,
  prs: ProxyRequests<TRequests>
): Disposable {
  const ks = Object.keys(rs).filter(k => !!prs[k])

  function replicateRequest(k: keyof TRequests): Disposable {
    return rs[k].run(prs[k], scheduler)
  }

  function disposeProxyRequest(k: keyof TRequests) {
    prs[k].end(scheduler.currentTime())
  }

  const d = disposeAll(ks.map(replicateRequest))

  function dispose() {
    d.dispose()
    Object.keys(prs).forEach(disposeProxyRequest)
  }

  return { dispose }
}
