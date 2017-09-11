import { Stream } from '@motorcycle/types'
import { until } from '@motorcycle/stream'

export function createDisposableSinks<Sinks extends Readonly<Record<string, Stream<any>>>>(
  sinks: Sinks,
  endSignal: Stream<any>
): Sinks {
  return Object.keys(sinks).reduce<Sinks>(
    function createDisposableSink(disposableSinks: Sinks, sinkName: keyof Sinks): Sinks {
      const disposableSink = until(endSignal, sinks[sinkName])

      disposableSinks[sinkName] = disposableSink

      return disposableSinks
    },
    {} as Sinks
  )
}
