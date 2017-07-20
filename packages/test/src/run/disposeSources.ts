import { Disposable } from '@motorcycle/types'

export function disposeSources<Sources>(sources: Sources): void {
  Object.keys(sources).forEach(function(key: keyof Sources) {
    const source = sources[key]

    if (isDisposable(source)) source.dispose()
  })
}

function isDisposable(x: any): x is Disposable {
  return x && typeof x.dispose === 'function'
}
