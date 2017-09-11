import { Disposable, Stream } from '@motorcycle/types'
import { ProxyStream, scheduler } from '@motorcycle/stream'

import { disposeAll } from '@most/disposable'

export function replicateSinks<Sinks extends Readonly<Record<string, Stream<any>>>>(
  sinks: Sinks,
  sinkProxies: Record<keyof Sinks, ProxyStream<any>>
): Disposable {
  const sinkNames = Object.keys(sinks).filter(name => !!sinkProxies[name])

  function replicateSink(name: keyof Sinks): Disposable {
    return sinks[name].run(sinkProxies[name], scheduler)
  }

  function disposeSinkProxy(name: keyof Sinks) {
    sinkProxies[name].end(scheduler.currentTime())
  }

  const disposable = disposeAll(sinkNames.map(replicateSink))

  function dispose() {
    disposable.dispose()
    Object.keys(sinkProxies).forEach(disposeSinkProxy)
  }

  return { dispose }
}
