import { Disposable } from '@motorcycle/types'

export function disposeResponse<TResponse>(x: TResponse): void {
  Object.keys(x).forEach(function(k: keyof TResponse) {
    const v = x[k]

    if (isDisposable(v)) v.dispose()
  })
}

function isDisposable(x: any): x is Disposable {
  return x && typeof x.dispose === 'function'
}
