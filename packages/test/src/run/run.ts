import { Component, IOComponent, Stream } from '@motorcycle/types'
import { ProxyStream, createProxy, scheduler } from '@motorcycle/stream'
import { createDisposableSinks, createProxySinks, replicateSinks } from './sinks'

import { disposeSources } from './disposeSources'

/**
 * This is nearly identical to the `run` found inside of `@motorcycle/run`. The
 * only difference is that it makes use of the test scheduler to create the
 * application's event loop. An additional property is returned with the `tick`
 * that allows you to control how time progresses.
 *
 * @name run<Sources, Sinks>(Main: Component<Sources, Sinks>, IO: IOComponent<Sinks, Sources>)
 * @example
 * import { run } from '@motorcycle/test'
 * import { makeDomComponent, div, button, h2, query, clickEvent } from '@motorcycle/dom'
 *
 * function Main(sources) {
 *   const { dom } = sources
 *
 *   const click$ = clickEvent(query('button', dom))
 *
 *   const count$ = scan(x => x + 1, click$)
 *
 *   const view$ = map(view, count$)
 *
 *   return { view$ }
 * }
 *
 * function view(count: number) {
 *   return div([
 *     h2(`Clicked ${count} times`),
 *     button('Click Me'),
 *   ])
 * }
 *
 * const Dom = fakeDomComponent({
 *   'button': {
 *     click: now(fakeEvent())
 *   }
 * })
 *
 * const { tick, dispose } = run(UI, Dom)
 *
 * tick(500).then(dispose)
 */
export function run<
  Sources extends Readonly<Record<string, any>>,
  Sinks extends Readonly<Record<string, Stream<any>>>
>(Main: Component<Sources, Sinks>, IO: IOComponent<Sinks, Sources>) {
  const { stream: endSignal } = createProxy<void>()

  const sinkProxies = {} as Record<keyof Sinks, ProxyStream<any>>
  const proxySinks: Sinks = createProxySinks(sinkProxies, endSignal)
  const sources: Sources = IO(proxySinks)
  const sinks: Sinks = createDisposableSinks(Main(sources), endSignal)

  const { disposable, tick } = replicateSinks(sinks, sinkProxies)

  function dispose() {
    endSignal.event(scheduler.currentTime(), void 0)
    disposable.dispose()
    disposeSources(sources)
  }

  return { sinks, sources, dispose, tick }
}
