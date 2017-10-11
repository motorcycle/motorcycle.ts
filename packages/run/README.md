# @motorcycle/run -- 4.1.0

A statically-typed, functional and reactive framework for modern browsers

## Get it
```sh
yarn add @motorcycle/run
# or
npm install --save @motorcycle/run
```

## API Documentation

All functions are curried!

#### run\<Sources, Sinks\>(Main: Component\<Sources, Sinks\>, IO: IOComponent\<Sinks, Sources\>)

<p>

Gets the Motorcycle engine roaring! This is the core of Motorcycle. It
creates an application loop between your purely functional `Main` function, and your
side-effectful `IO` function using [`@most/core`](https://github.com/mostjs/core).

This is made possible by the use of the ES2015 Proxy. This means that Motorcycle
will only support modern browsers with this feature. All major browsers, still
supported by their vendors(Google, Microsoft, Apple), support this feature.

</p>


<details>
  <summary>See an example</summary>
  
```typescript
import { run } from '@motorcycle/run'
import { makeDomComponent, div, button, h2, query, clickEvent } from '@motorcycle/dom'

function Main(sources) {
  const { dom } = sources

  const click$ = clickEvent(query('button', dom))

  const count$ = scan(x => x + 1, click$)

  const view$ = map(view, count$)

  return { view$ }
}

function view(count: number) {
  return div([
    h2(`Clicked ${count} times`),
    button('Click Me'),
  ])
}

run(Main, makeDomComponent(document.querySelector('#app')))
```

</details>

<details>
  <summary>See the code</summary>

```typescript

export function run<
  Sources extends Readonly<Record<string, any>>,
  Sinks extends Readonly<Record<string, Stream<any>>>
>(Main: Component<Sources, Sinks>, IO: IOComponent<Sinks, Sources>) {
  const { stream: endSignal } = createProxy<void>()

  const sinkProxies = {} as Record<keyof Sinks, ProxyStream<any>>
  const proxySinks: Sinks = createProxySinks(sinkProxies, endSignal)
  const sources: Sources = IO(proxySinks)
  const sinks: Sinks = createDisposableSinks(Main(sources), endSignal)

  const disposable = replicateSinks(sinks, sinkProxies)

  function dispose() {
    endSignal.event(scheduler.currentTime(), void 0)
    disposable.dispose()
    disposeSources(sources)
  }

  return { sinks, sources, dispose }
}

```

</details>

<hr />
