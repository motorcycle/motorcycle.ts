import { DataFlowComponent, Dialogue, Requests, Responses, Stream } from '@motorcycle/types'
import { ProxyStream, createProxy, scheduler } from '@motorcycle/stream'
import { replicateRequests, toDisposableRequests, toProxyRequests } from './request'

import { disposeResponse } from './disposeResponse'

/**
 * Main is a function type that accepts an object of Responses and returns 
 * an object of Requests.
 * 
 * @name Main
 * @example
 * export interface Main<TResponses extends Responses, TRequests extends Requests> {
 *   (rs: TResponses): TRequests
 * }
 * @type true
 */
export interface Main<TResponses extends Responses, TRequests extends Requests>
  extends DataFlowComponent<TResponses, TRequests> {
  (rs: TResponses): TRequests
}

/**
 * RunSpec is a row-like object that holds a Main function and a Dialogue function.
 * 
 * @name RunSpec
 * @example
 * export interface RunSpec<TResponses extends Responses, TRequests extends Requests> {
 *   readonly main: Main<TResponses, TRequests>
 *   readonly dialogue: Dialogue<TRequests, TResponses>
 * }
 * @type true
 */
export interface RunSpec<TResponses extends Responses, TRequests extends Requests> {
  readonly main: Main<TResponses, TRequests>
  readonly dialogue: Dialogue<TRequests, TResponses>
}

/**
 * IODisposable is a row-like object that holds Responses, Requests and a dispose() method.
 * 
 * @name IODisposable
 * @example
 * export interface IODisposable<TResponses extends Responses, TRequests extends Requests> {
 *   responses: TResponses
 *   requests: TRequests
 *   dispose: () => void
 * }
 * @type true
 */
export interface IODisposable<TResponses extends Responses, TRequests extends Requests> {
  responses: TResponses
  requests: TRequests
  dispose: () => void
}

/**
 * Run is function type that accepts a RunSpec and returns an IODisposable.
 * 
 * @name Run
 * @example
 * export interface Run {
 *   <TResponses extends Responses, TRequests extends Requests>(
 *     a: RunSpec<TResponses, TRequests>
 *   ): IODisposable<TResponses, TRequests>
 * }
 * @type true
 */
export interface Run {
  <TResponses extends Responses, TRequests extends Requests>(
    a: RunSpec<TResponses, TRequests>
  ): IODisposable<TResponses, TRequests>
}

export type ProxyRequests<TRequests> = Record<keyof TRequests, ProxyStream<any>>

export type EndSignal = Stream<void>

/**
 * Gets the Motorcycle engine roaring! This is the core of Motorcycle. It
 * creates an application loop between your purely functional `Main` function, and your
 * side-effectful `Dialogue` function using [`@most/core`](https://github.com/mostjs/core).
 *
 * This is made possible by the use of the ES2015 Proxy. This means that Motorcycle
 * will only support modern browsers with this feature. All major browsers, still
 * supported by their vendors(Google, Microsoft, Apple), support this feature.
 *
 * @name run<TResponses extends Responses, TRequests extends Requests>({ main, dialogue }: RunSpec<TResponses, TRequests>): IODisposable<TResponses, TRequests> {
 * @example
 * import { run } from '@motorcycle/test'
 * import { domDialogueOver, div, button, h2, query, clickEvent } from '@motorcycle/dom'
 *
 * function main(rs) {
 *   const { dom } = rs
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
 * const domDialogue = domDialogueOver(document.querySelector('#app'))
 *
 * run({ main, domDialogue })
 */
export const run: Run = function<TResponses extends Responses, TRequests extends Requests>({
  main,
  dialogue,
}: RunSpec<TResponses, TRequests>): IODisposable<TResponses, TRequests> {
  const { stream: endSignal } = createProxy<void>()

  const proxyRequestsTarget = {} as ProxyRequests<TRequests>
  const proxyRequests: TRequests = toProxyRequests(proxyRequestsTarget, endSignal)
  const responses: TResponses = dialogue(proxyRequests)
  const requests: TRequests = toDisposableRequests(main(responses), endSignal)

  const disposable = replicateRequests(requests, proxyRequestsTarget)

  function dispose() {
    endSignal.event(scheduler.currentTime(), void 0)
    disposable.dispose()
    disposeResponse(responses)
  }

  return { responses, requests, dispose }
}
