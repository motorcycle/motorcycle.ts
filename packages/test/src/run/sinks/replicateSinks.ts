import { Disposable, Stream } from '@motorcycle/types'

import { ProxyStream } from '@motorcycle/stream'
import { createTestScheduler } from '../../createTestScheduler'
import { disposeAll } from '@most/disposable'

export function replicateSinks<Sinks extends Readonly<Record<string, Stream<any>>>>(
  sinks: Sinks,
  sinkProxies: Record<keyof Sinks, ProxyStream<any>>
) {
  const sinkNames = Object.keys(sinks).filter(name => !!sinkProxies[name])

  const { tick, scheduler } = createTestScheduler()

  function replicateSink(name: keyof Sinks): Disposable {
    return sinks[name].run(sinkProxies[name], scheduler)
  }

  function disposeSinkProxy(name: keyof Sinks) {
    sinkProxies[name].end(scheduler.currentTime())
  }

  const disposables = sinkNames.map(replicateSink)

  function dispose() {
    disposeAll(disposables).dispose()
    Object.keys(sinkProxies).forEach(disposeSinkProxy)
  }

  const disposable = { dispose }

  return { disposable, tick }
}
