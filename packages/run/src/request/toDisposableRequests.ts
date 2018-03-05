import { EndSignal } from '..'
import { Requests } from '@motorcycle/types'
import { until } from '@motorcycle/stream'

export interface toDisposableRequestsFn {
  <TRequests extends Requests>(rs: TRequests, e: EndSignal): TRequests
}

export const toDisposableRequests: toDisposableRequestsFn = function<TRequests extends Requests>(
  rs: TRequests,
  e: EndSignal
): TRequests {
  return Object.keys(rs).reduce<TRequests>(
    function addDisposableStream(ds: TRequests, k: keyof TRequests): TRequests {
      const s = until(e, rs[k])
      ds[k] = s

      return ds
    },
    {} as TRequests
  )
}
